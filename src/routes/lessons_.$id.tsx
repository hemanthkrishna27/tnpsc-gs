import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  Check,
  ExternalLink,
  Play,
} from "lucide-react";
import { LessonCard } from "@/components/lesson-card";
import { AdSlot } from "@/components/ad-slot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CHANNEL,
  CLASS_LABEL,
  SUBJECTS,
  getLesson,
  getQuiz,
  relatedLessons,
  youtubeSearch,
} from "@/lib/data";
import { cn } from "@/lib/cn";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/lessons_/$id")({
  component: LessonPage,
});

function LessonPage() {
  const { id } = Route.useParams();
  const lesson = getLesson(id);
  if (!lesson) throw notFound();

  const saved = useStudy((s) => s.saved.includes(lesson.id));
  const watched = useStudy((s) => s.watched.includes(lesson.id));
  const toggleSaved = useStudy((s) => s.toggleSaved);
  const markWatched = useStudy((s) => s.markWatched);
  const quiz = lesson.quizId ? getQuiz(lesson.quizId) : undefined;
  const related = relatedLessons(lesson);
  const watchUrl = youtubeSearch(lesson.youtubeQuery);

  return (
    <article>
      <div className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-1.5 text-sm text-cream/60 hover:text-cream"
          >
            <ArrowLeft className="size-4" />
            All lessons
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="accent">{CLASS_LABEL[lesson.classLevel]}</Badge>
            <Badge tone="paper">{SUBJECTS[lesson.subject].label}</Badge>
            {lesson.unit > 0 && (
              <Badge tone="paper">
                Unit {lesson.unit} · {lesson.unitName}
              </Badge>
            )}
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-5xl">
            {lesson.title}
          </h1>
          {lesson.tamilTitle && (
            <p className="tamil mt-2 text-lg text-cream/70">
              {lesson.tamilTitle}
            </p>
          )}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/65">
            {lesson.summary}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl bg-ink shadow-[var(--shadow-card)]">
            <div className="relative">
              <img
                src={lesson.thumbnail}
                alt=""
                className="aspect-video w-full object-cover"
              />
              <span className="absolute inset-0 bg-ink/25" />
              <a
                href={watchUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink"
                aria-label="Watch on YouTube"
              >
                <Play className="ml-0.5 size-6 fill-ink" />
              </a>
              <span className="absolute right-3 bottom-3 rounded-md bg-ink/80 px-2 py-0.5 text-xs tabular-nums text-cream">
                {lesson.duration}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <a href={watchUrl} target="_blank" rel="noreferrer">
                Watch on YouTube
                <ExternalLink className="size-4" />
              </a>
            </Button>
            <Button
              variant={watched ? "outline" : "ink"}
              onClick={() => markWatched(lesson.id)}
            >
              <Check className="size-4" />
              {watched ? "Marked read" : "Mark as read"}
            </Button>
            <Button variant="outline" onClick={() => toggleSaved(lesson.id)}>
              <Bookmark
                className="size-4"
                fill={saved ? "currentColor" : "none"}
              />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-semibold">
              Study notes
            </h2>
            <div className="mt-5 space-y-4">
              {lesson.notes.map((n) => (
                <div
                  key={n.heading}
                  className="notebook-rule rounded-xl bg-cream px-5 py-4 shadow-[var(--shadow-card)] sm:px-6"
                >
                  <h3 className="font-display text-lg font-semibold">
                    {n.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {n.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8">
            <AdSlot placement="infeed" />
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-2xl bg-cream p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-lg font-semibold">Key points</h2>
            <ol className="mt-4 space-y-3">
              {lesson.keyPoints.map((p, i) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 font-display text-sm font-semibold text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
          </div>

          {quiz && (
            <div className="mt-4 rounded-2xl bg-ink p-6 text-cream">
              <p className="text-xs tracking-wide text-cream/50 uppercase">
                Practice
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold">
                {quiz.title}
              </h2>
              <p className="mt-2 text-sm text-cream/65">
                {quiz.questions.length} questions · {quiz.minutes} minutes
              </p>
              <Button asChild className="mt-4">
                <Link to="/practice/$id" params={{ id: quiz.id }}>
                  Sit this paper
                </Link>
              </Button>
            </div>
          )}

          <div className="mt-4">
            <AdSlot placement="sidebar" />
          </div>

          <div className="mt-4 rounded-2xl bg-cream p-6 text-sm text-muted shadow-[var(--shadow-card)]">
            <p>
              {lesson.views} views · {lesson.published}
            </p>
            <a
              href={CHANNEL.youtube}
              target="_blank"
              rel="noreferrer"
              className={cn("mt-2 inline-block text-accent hover:underline")}
            >
              {CHANNEL.handle} on YouTube
            </a>
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <AdSlot placement="multiplex" />
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-semibold">
              Continue in this unit
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((l) => (
                <LessonCard key={l.id} lesson={l} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
