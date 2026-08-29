import { Link } from "@tanstack/react-router";
import { ExternalLink, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { ChannelVideo } from "@/lib/uploads";

export function VideoCard({ video }: { video: ChannelVideo }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-cream shadow-[var(--shadow-card)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-card-hover)]">
      <a
        href={video.url}
        target="_blank"
        rel="noreferrer"
        className="relative block overflow-hidden"
      >
        <img
          src={video.thumbnail}
          alt=""
          className="aspect-video w-full object-cover outline-none transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <span className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-cream/95 text-ink">
            <Play className="ml-0.5 size-3.5 fill-ink" />
          </span>
          {video.duration && (
            <span className="rounded-md bg-ink/80 px-2 py-0.5 text-xs tabular-nums text-cream">
              {video.duration}
            </span>
          )}
        </span>
      </a>
      <div className="flex flex-1 flex-col p-4">
        <Badge tone="paper">YouTube</Badge>
        <a
          href={video.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 font-display text-base font-semibold tracking-tight group-hover:text-accent"
        >
          {video.title}
        </a>
        <p className="mt-auto pt-3 text-xs text-faint">
          {[video.views, video.published].filter(Boolean).join(" · ")}
        </p>
        {video.lessonId ? (
          <Link
            to="/lessons/$id"
            params={{ id: video.lessonId }}
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Notes on this desk
          </Link>
        ) : (
          <a
            href={video.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
          >
            Watch on YouTube
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

export function VideoGrid({
  videos,
  className,
}: {
  videos: ChannelVideo[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}
