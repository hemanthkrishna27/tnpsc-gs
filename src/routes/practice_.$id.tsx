import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, RotateCcw, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { getLesson, getQuiz, type Quiz } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/practice_/$id")({
  component: QuizPage,
});

function QuizPage() {
  const { id } = Route.useParams();
  const quiz = getQuiz(id);
  if (!quiz) throw notFound();
  return <QuizInner quiz={quiz} />;
}

function QuizInner({ quiz }: { quiz: Quiz }) {
  const lesson = quiz.lessonId ? getLesson(quiz.lessonId) : undefined;

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    quiz.questions.map(() => null),
  );
  const [done, setDone] = useState(false);
  const setScore = useStudy((s) => s.setScore);
  const prev = useStudy((s) => s.scores[quiz.id]);

  const question = quiz.questions[index]!;
  const total = quiz.questions.length;
  const correctCount = useMemo(
    () =>
      quiz.questions.reduce(
        (n, q, i) => n + (answers[i] === q.answer ? 1 : 0),
        0,
      ),
    [answers, quiz.questions],
  );

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setAnswers((a) => {
      const next = [...a];
      next[index] = i;
      return next;
    });
  }

  function goNext() {
    if (index + 1 >= total) {
      const correct = quiz.questions.reduce(
        (n, q, i) => n + (answers[i] === q.answer ? 1 : 0),
        0,
      );
      setScore(quiz.id, correct, total);
      setDone(true);
      return;
    }
    setIndex((n) => n + 1);
    setPicked(answers[index + 1] ?? null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setAnswers(quiz.questions.map(() => null));
    setDone(false);
  }

  if (done) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Result</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">
          {correctCount}/{total}
        </h1>
        <p className="mt-2 text-muted">
          {pct >= 80
            ? "The unit is sitting. Move to the next lesson."
            : pct >= 50
              ? "Close. Re-read the key points and sit it again."
              : "Go back to the notes before the next attempt."}
        </p>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-paper-2">
          <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={restart}>
            <RotateCcw className="size-4" />
            Sit again
          </Button>
          {lesson && (
            <Button asChild variant="outline">
              <Link to="/lessons/$id" params={{ id: lesson.id }}>
                Back to the lesson
              </Link>
            </Button>
          )}
          <Button asChild variant="ghost">
            <Link to="/practice">All papers</Link>
          </Button>
        </div>
        <ol className="mt-10 space-y-3">
          {quiz.questions.map((q, i) => {
            const ok = answers[i] === q.answer;
            return (
              <li
                key={q.q}
                className="rounded-xl bg-cream px-4 py-3 shadow-[var(--shadow-card)]"
              >
                <p className="flex items-start gap-2 text-sm font-medium">
                  {ok ? (
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  ) : (
                    <X className="mt-0.5 size-4 shrink-0 text-accent" />
                  )}
                  {q.q}
                </p>
                <p className="mt-1 pl-6 text-xs text-muted">{q.explain}</p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  const revealed = picked !== null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to="/practice"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        All papers
      </Link>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">
            {quiz.title}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
            Question {index + 1}
            <span className="text-muted">/{total}</span>
          </h1>
        </div>
        {prev && (
          <p className="text-xs tabular-nums text-faint">
            Last {prev.correct}/{prev.total}
          </p>
        )}
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper-2">
        <div
          className="h-full bg-ink transition-[width] duration-300 ease-out"
          style={{
            width: `${((index + (revealed ? 1 : 0)) / total) * 100}%`,
          }}
        />
      </div>

      <fieldset className="mt-10">
        <legend className="font-display text-xl font-semibold sm:text-2xl">
          {question.q}
        </legend>
        <div className="mt-6 grid gap-2">
          {question.options.map((opt, i) => {
            const isPick = picked === i;
            const isAns = i === question.answer;
            const show = revealed && (isPick || isAns);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(i)}
                disabled={revealed}
                className={cn(
                  "rounded-xl px-4 py-3.5 text-left text-sm transition-colors duration-150",
                  "bg-cream shadow-[0_0_0_1px_var(--color-border)]",
                  !revealed && "hover:bg-paper-2",
                  show &&
                    isAns &&
                    "bg-success-soft shadow-[0_0_0_1px_var(--color-success)]",
                  show &&
                    isPick &&
                    !isAns &&
                    "bg-accent-soft shadow-[0_0_0_1px_var(--color-accent)]",
                )}
              >
                <span className="mr-3 font-display text-xs text-muted">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </fieldset>

      {revealed && (
        <p className="mt-5 rounded-xl bg-cream px-4 py-3 text-sm leading-relaxed text-muted shadow-[var(--shadow-card)]">
          {question.explain}
        </p>
      )}

      <div className="mt-8 flex justify-end">
        <Button onClick={goNext} disabled={!revealed}>
          {index + 1 >= total ? "See result" : "Next question"}
        </Button>
      </div>
    </div>
  );
}
