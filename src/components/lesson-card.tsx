import { Link } from "@tanstack/react-router";
import { Bookmark, Check, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CLASS_LABEL, SUBJECTS, type Lesson } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useStudy } from "@/lib/store";

export function LessonCard({
  lesson,
  featured = false,
}: {
  lesson: Lesson;
  featured?: boolean;
}) {
  const saved = useStudy((s) => s.saved.includes(lesson.id));
  const watched = useStudy((s) => s.watched.includes(lesson.id));
  const toggleSaved = useStudy((s) => s.toggleSaved);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden bg-cream shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[var(--shadow-card-hover)]",
        featured ? "rounded-2xl" : "rounded-xl",
      )}
    >
      <Link
        to="/lessons/$id"
        params={{ id: lesson.id }}
        className="relative block overflow-hidden"
      >
        <img
          src={lesson.thumbnail}
          alt=""
          className={cn(
            "w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]",
            featured ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-video",
          )}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <span className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-cream/95 text-ink">
            <Play className="ml-0.5 size-3.5 fill-ink" />
          </span>
          <span className="rounded-md bg-ink/80 px-2 py-0.5 text-xs tabular-nums text-cream">
            {lesson.duration}
          </span>
        </span>
        {watched && (
          <span className="absolute top-3 left-3 grid size-7 place-items-center rounded-full bg-success text-cream">
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
        )}
      </Link>

      <div className={cn("flex flex-1 flex-col", featured ? "p-5 sm:p-6" : "p-4")}>
        <div className="flex items-center gap-2">
          <Badge tone="paper">
            {CLASS_LABEL[lesson.classLevel]}
          </Badge>
          <span className="text-xs text-muted">{SUBJECTS[lesson.subject].label}</span>
          {lesson.unit > 0 && (
            <span className="text-xs text-muted">Unit {lesson.unit}</span>
          )}
        </div>
        <Link
          to="/lessons/$id"
          params={{ id: lesson.id }}
          className="mt-2"
        >
          <h3
            className={cn(
              "font-display font-semibold tracking-tight text-fg group-hover:text-accent",
              featured ? "text-xl sm:text-2xl" : "text-base",
            )}
          >
            {lesson.title}
          </h3>
          {lesson.tamilTitle && (
            <p className="tamil mt-1 text-sm text-muted">{lesson.tamilTitle}</p>
          )}
        </Link>
        {featured && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {lesson.summary}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-faint">
          <span>
            {lesson.views} views · {lesson.published}
          </span>
          <button
            type="button"
            onClick={() => toggleSaved(lesson.id)}
            aria-label={saved ? "Remove from saved" : "Save lesson"}
            className={cn(
              "flex size-9 items-center justify-center rounded-md transition-colors",
              saved ? "text-accent" : "text-muted hover:text-fg",
            )}
          >
            <Bookmark
              className="size-4"
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
