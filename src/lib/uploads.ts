import { createServerFn } from "@tanstack/react-start";
import { lessons, latestLessons, youtubeSearch, type Lesson } from "@/lib/data";

export type ChannelVideo = {
  id: string;
  title: string;
  published: string;
  views?: string;
  duration?: string;
  thumbnail: string;
  url: string;
  lessonId?: string;
};

export type UploadsPayload = {
  videos: ChannelVideo[];
  fetchedAt: number;
  source: "youtube" | "catalogue";
};

function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[|·•]/g, " ")
    .replace(/[^a-z0-9\u0b80-\u0bff]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchLesson(title: string): Lesson | undefined {
  const n = norm(title);
  if (!n) return undefined;
  let best: { lesson: Lesson; score: number } | undefined;
  for (const lesson of lessons) {
    const keys = [lesson.title, lesson.unitName, lesson.youtubeQuery, lesson.tamilTitle]
      .filter((k): k is string => Boolean(k))
      .map(norm)
      .filter((k) => k.length >= 8);
    for (const key of keys) {
      const hit = n.includes(key) || key.includes(n);
      if (!hit) continue;
      const score = Math.min(n.length, key.length);
      if (!best || score > best.score) best = { lesson, score };
    }
  }
  return best?.lesson;
}

export function withLessonMatch(video: ChannelVideo): ChannelVideo {
  if (video.lessonId) return video;
  const lesson = matchLesson(video.title);
  return lesson ? { ...video, lessonId: lesson.id } : video;
}

export function catalogueFallback(): UploadsPayload {
  return {
    fetchedAt: Date.now(),
    source: "catalogue",
    videos: latestLessons.map((l) => ({
      id: l.id,
      title: l.title,
      published: l.published,
      views: l.views,
      duration: l.duration,
      thumbnail: l.thumbnail,
      url: youtubeSearch(l.youtubeQuery),
      lessonId: l.id,
    })),
  };
}

export const fetchChannelUploads = createServerFn({ method: "GET" }).handler(
  async () => {
    const { loadUploads } = await import("./youtube.server");
    return loadUploads();
  },
);
