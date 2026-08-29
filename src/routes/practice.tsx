import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { SUBJECTS, quizzes } from "@/lib/data";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/practice")({ component: PracticePage });

function PracticePage() {
  const scores = useStudy((s) => s.scores);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        Practice hall
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
        Sit a short paper
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Questions lifted from the same Samacheer units as the videos. Your best
        score stays on this device.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {quizzes.map((q) => {
          const score = scores[q.id];
          return (
            <Link
              key={q.id}
              to="/practice/$id"
              params={{ id: q.id }}
              className="flex flex-col rounded-2xl bg-cream p-6 shadow-[var(--shadow-card)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-card-hover)]"
            >
              <p className="text-xs tracking-wide text-muted uppercase">
                {SUBJECTS[q.subject].label} · {q.minutes} min
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">
                {q.title}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {q.questions.length} questions
              </p>
              <div className="mt-6 flex items-center justify-between">
                {score ? (
                  <span className="text-sm tabular-nums text-success">
                    Last score {score.correct}/{score.total}
                  </span>
                ) : (
                  <span className="text-sm text-faint">Not attempted</span>
                )}
                <span className="inline-flex items-center gap-1 text-sm text-accent">
                  Start <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-10">
        <AdSlot placement="banner" />
      </div>
    </div>
  );
}
