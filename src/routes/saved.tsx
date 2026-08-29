import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonCard } from "@/components/lesson-card";
import { Button } from "@/components/ui/button";
import { getLesson, lessons } from "@/lib/data";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/saved")({ component: SavedPage });

function SavedPage() {
  const saved = useStudy((s) => s.saved);
  const watched = useStudy((s) => s.watched);
  const ready = useStudy((s) => s.ready);
  const savedLessons = saved
    .map((id) => getLesson(id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));
  const watchedLessons = watched
    .map((id) => getLesson(id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        Your desk
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
        Saved lessons
      </h1>
      <p className="mt-2 text-sm text-muted">
        Bookmarks and read marks stay in this browser.
        {ready
          ? ` ${watched.length}/${lessons.length} of the catalogue marked read.`
          : null}
      </p>

      {savedLessons.length === 0 ? (
        <div className="mt-12 rounded-2xl bg-cream px-6 py-14 text-center shadow-[var(--shadow-card)]">
          <p className="font-display text-xl font-semibold">Nothing saved yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            Open a lesson and tap the bookmark. Force and Pressure is the usual
            place to begin.
          </p>
          <Button asChild className="mt-6">
            <Link to="/lessons">Browse lessons</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {savedLessons.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      )}

      {watchedLessons.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">Marked read</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {watchedLessons.map((l) => (
              <LessonCard key={l.id} lesson={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
