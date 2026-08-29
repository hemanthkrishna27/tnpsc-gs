import { CHANNEL } from "@/lib/data";
import {
  catalogueFallback,
  withLessonMatch,
  type ChannelVideo,
  type UploadsPayload,
} from "@/lib/uploads";

const TTL_MS = 10 * 60 * 1000;
const RSS = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL.channelId}`;
const INNERTUBE = "https://www.youtube.com/youtubei/v1/browse?prettyPrint=false";
const VIDEOS_TAB = "EgZ2aWRlb3PyBgQKAjoA";
const CLIENT_VERSION = "2.20260828.01.00";

let cache: UploadsPayload | null = null;

export async function loadUploads(): Promise<UploadsPayload> {
  if (cache && Date.now() - cache.fetchedAt < TTL_MS && cache.videos.length) {
    return cache;
  }
  try {
    const live = (await fromInnertube()) ?? (await fromRss());
    if (live && live.length) {
      cache = {
        videos: live.map(withLessonMatch),
        fetchedAt: Date.now(),
        source: "youtube",
      };
      return cache;
    }
  } catch (err) {
    console.error("[uploads] YouTube fetch failed", err);
  }
  if (cache?.videos.length) return cache;
  return catalogueFallback();
}

async function fromRss(): Promise<ChannelVideo[] | null> {
  const res = await fetch(RSS, {
    headers: {
      Accept: "application/atom+xml,application/xml,text/xml",
      "User-Agent":
        "Mozilla/5.0 (compatible; TNPSC-GS-desk/1.0; +https://www.youtube.com/@tnpscgs)",
    },
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) return null;
  const xml = await res.text();
  if (!xml.includes("<entry")) return null;
  const videos = parseRss(xml);
  return videos.length ? videos : null;
}

function parseRss(xml: string): ChannelVideo[] {
  const chunks = xml.split("<entry").slice(1);
  const out: ChannelVideo[] = [];
  for (const chunk of chunks) {
    const id =
      pick(chunk, /<yt:videoId>([^<]+)<\/yt:videoId>/) ??
      pick(chunk, /yt:video:([\w-]{11})/);
    const title = decode(
      pick(chunk, /<title[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/) ?? "",
    );
    if (!id || !title) continue;
    const publishedRaw = pick(chunk, /<published>([^<]+)<\/published>/);
    out.push({
      id,
      title,
      published: formatPublished(publishedRaw),
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
    });
  }
  return out;
}

async function fromInnertube(): Promise<ChannelVideo[] | null> {
  const res = await fetch(INNERTUBE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "X-YouTube-Client-Name": "1",
      "X-YouTube-Client-Version": CLIENT_VERSION,
    },
    body: JSON.stringify({
      context: {
        client: {
          clientName: "WEB",
          clientVersion: CLIENT_VERSION,
          hl: "en",
          gl: "IN",
        },
      },
      browseId: CHANNEL.channelId,
      params: VIDEOS_TAB,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return null;
  const data: unknown = await res.json();
  const videos = parseInnertube(data);
  return videos.length ? videos : null;
}

function parseInnertube(data: unknown): ChannelVideo[] {
  const tabs = arr(
    deep(data, ["contents", "twoColumnBrowseResultsRenderer", "tabs"]),
  );
  let grid: unknown[] = [];
  for (const tab of tabs) {
    const renderer = rec(rec(tab)?.tabRenderer);
    if (!renderer) continue;
    const contents = arr(
      deep(renderer, ["content", "richGridRenderer", "contents"]),
    );
    if (str(renderer.title) === "Videos" && contents.length) {
      grid = contents;
      break;
    }
    if (renderer.selected === true && contents.length) grid = contents;
  }

  const videos: ChannelVideo[] = [];
  const seen = new Set<string>();
  const take = (video: ChannelVideo | null) => {
    if (!video || seen.has(video.id)) return;
    seen.add(video.id);
    videos.push(video);
  };

  for (const item of grid) {
    const content = rec(deep(item, ["richItemRenderer", "content"]));
    if (!content) continue;
    const lockup = rec(content.lockupViewModel);
    if (lockup) {
      take(fromLockup(lockup));
      continue;
    }
    take(
      fromGrid(
        rec(content.gridVideoRenderer) ?? rec(content.videoRenderer) ?? {},
      ),
    );
  }
  return videos;
}

function fromLockup(lockup: Record<string, unknown>): ChannelVideo | null {
  const kind = str(lockup.contentType);
  if (kind && kind !== "LOCKUP_CONTENT_TYPE_VIDEO") return null;
  const id =
    str(lockup.contentId) ??
    str(
      deep(lockup, [
        "rendererContext",
        "commandContext",
        "onTap",
        "innertubeCommand",
        "watchEndpoint",
        "videoId",
      ]),
    );
  const title = str(
    deep(lockup, ["metadata", "lockupMetadataViewModel", "title", "content"]),
  );
  if (!id || !title) return null;
  const parts = metadataParts(
    deep(lockup, [
      "metadata",
      "lockupMetadataViewModel",
      "metadata",
      "contentMetadataViewModel",
    ]),
  );
  return {
    id,
    title,
    published:
      parts.find((p) => /ago|stream|premier|today/i.test(p)) ?? parts[1] ?? "",
    views: parts.find((p) => /view/i.test(p)),
    duration: firstBadge(lockup),
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    url: `https://www.youtube.com/watch?v=${id}`,
  };
}

function fromGrid(grid: Record<string, unknown>): ChannelVideo | null {
  const id = str(grid.videoId);
  const title =
    str(deep(grid, ["title", "runs", "0", "text"])) ??
    str(deep(grid, ["title", "simpleText"]));
  if (!id || !title) return null;
  const published =
    str(deep(grid, ["publishedTimeText", "simpleText"])) ?? "";
  const views = str(deep(grid, ["viewCountText", "simpleText"]));
  const duration =
    str(
      deep(grid, [
        "thumbnailOverlays",
        "0",
        "thumbnailOverlayTimeStatusRenderer",
        "text",
        "simpleText",
      ]),
    ) ?? undefined;
  return {
    id,
    title,
    published,
    views,
    duration,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    url: `https://www.youtube.com/watch?v=${id}`,
  };
}

function metadataParts(node: unknown): string[] {
  const rows = arr(rec(node)?.metadataRows);
  const parts: string[] = [];
  for (const row of rows) {
    const list = arr(rec(row)?.metadataParts);
    for (const part of list) {
      const text = str(deep(part, ["text", "content"]));
      if (text) parts.push(text);
    }
  }
  return parts;
}

function firstBadge(lockup: Record<string, unknown>): string | undefined {
  let found: string | undefined;
  walk(lockup, (node) => {
    if (found) return;
    const badge = rec(node.thumbnailBadgeViewModel);
    const text = badge ? str(badge.text) : undefined;
    if (text && /^\d/.test(text) && text.includes(":")) found = text;
  });
  return found;
}

function walk(value: unknown, visit: (node: Record<string, unknown>) => void) {
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit);
    return;
  }
  const node = rec(value);
  if (!node) return;
  visit(node);
  for (const child of Object.values(node)) walk(child, visit);
}

function rec(value: unknown): Record<string, unknown> | null {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function arr(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function deep(value: unknown, path: string[]): unknown {
  let cur: unknown = value;
  for (const key of path) {
    if (Array.isArray(cur)) {
      const i = Number(key);
      cur = Number.isInteger(i) ? cur[i] : undefined;
      continue;
    }
    const node = rec(cur);
    if (!node) return undefined;
    cur = node[key];
  }
  return cur;
}

function pick(haystack: string, re: RegExp) {
  return re.exec(haystack)?.[1]?.trim();
}

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'");
}

function formatPublished(iso?: string) {
  if (!iso) return "";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return iso;
  const days = Math.round((Date.now() - then) / 86_400_000);
  if (days < 1) return "today";
  if (days === 1) return "1 day ago";
  if (days < 14) return `${days} days ago`;
  if (days < 45) return `${Math.round(days / 7)} weeks ago`;
  if (days < 365) return `${Math.round(days / 30)} months ago`;
  const years = Math.round(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}
