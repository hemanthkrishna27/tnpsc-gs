import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  Play,
  Youtube,
} from "lucide-react";
import type { ReactNode } from "react";
import { LessonCard } from "@/components/lesson-card";
import { AdSlot } from "@/components/ad-slot";
import { VideoGrid } from "@/components/video-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CHANNEL,
  CLASS_LABEL,
  SUBJECTS,
  courses,
  featuredLesson,
  lessons,
  popularLessons,
  quizzes,
  type Subject,
} from "@/lib/data";
import { catalogueFallback, fetchChannelUploads } from "@/lib/uploads";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      return await fetchChannelUploads();
    } catch {
      return catalogueFallback();
    }
  },
  component: Home,
});

const SUBJECT_ORDER: Subject[] = [
  "science",
  "history",
  "geography",
  "english",
  "maths",
  "current-affairs",
  "pyq",
];

function Home() {
  const watched = useStudy((s) => s.watched);
  const saved = useStudy((s) => s.saved);
  const progress = Math.round((watched.length / lessons.length) * 100);
  const uploads = Route.useLoaderData();
  const live = uploads.source === "youtube";
  const latest = uploads.videos.slice(0, 8);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-cream">
        <img
          src="/images/hero-desk.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-35 outline-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="rise text-xs font-medium tracking-[0.22em] text-cream/55 uppercase">
              {CHANNEL.handle} · {CHANNEL.subscribers} subscribers
            </p>
            <h1 className="rise-2 tamil mt-4 font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl">
              {CHANNEL.taglineTa}
            </h1>
            <p className="rise-3 mt-3 font-display text-xl text-cream/80 sm:text-2xl">
              {CHANNEL.taglineEn}
            </p>
            <p className="rise-3 mt-5 max-w-xl text-base leading-relaxed text-cream/70">
              {CHANNEL.blurb} Start with Class 8 Science Unit 2 — Force and
              Pressure — the lesson the channel is built around.
            </p>
            <div className="rise-4 mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/lessons/$id" params={{ id: featuredLesson.id }}>
                  Watch Unit 2
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="cream">
                <Link to="/lessons">Browse lessons</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-cream/15 pt-6">
              {[
                [CHANNEL.videoCount, "Lessons"],
                [CHANNEL.subscribers, "Subscribers"],
                ["6–8", "Samacheer"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="text-xs tracking-wide text-cream/50 uppercase">
                    {l}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">
                    {n}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rise-3 lg:col-span-5">
            <Link
              to="/lessons/$id"
              params={{ id: featuredLesson.id }}
              className="group block overflow-hidden rounded-2xl bg-ink-soft shadow-[var(--shadow-card)]"
            >
              <div className="relative">
                <img
                  src={featuredLesson.thumbnail}
                  alt=""
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-ink/20" />
                <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink shadow-md">
                  <Play className="ml-0.5 size-5 fill-ink" />
                </span>
                <span className="absolute top-3 left-3">
                  <Badge tone="accent">Now playing</Badge>
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs tracking-wide text-cream/50 uppercase">
                  {CLASS_LABEL[featuredLesson.classLevel]} · Science · Unit{" "}
                  {featuredLesson.unit}
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold">
                  {featuredLesson.title}
                </h2>
                <p className="tamil mt-1 text-sm text-cream/60">
                  {featuredLesson.tamilTitle}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {watched.length > 0 && (
        <section className="border-b border-border bg-cream">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <p className="text-sm text-muted">
              Your desk ·{" "}
              <span className="font-medium text-fg tabular-nums">
                {watched.length}/{lessons.length}
              </span>{" "}
              lessons marked read · {progress}% of the catalogue
            </p>
            <Link
              to="/saved"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              <Bookmark className="size-3.5" />
              {saved.length} saved
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <HeaderRow kicker="Tracks" title="Pick a class, then a subject">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </HeaderRow>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link
              key={c.slug}
              to="/courses/$slug"
              params={{ slug: c.slug }}
              className="group overflow-hidden rounded-2xl bg-cream shadow-[var(--shadow-card)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-card-hover)]"
            >
              <img
                src={c.cover}
                alt=""
                className="aspect-[16/7] w-full object-cover"
              />
              <div className="notebook-rule p-5">
                <p className="text-xs tracking-wide text-muted uppercase">
                  {CLASS_LABEL[c.classLevel]} · {c.lessonIds.length} lessons
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold group-hover:text-accent">
                  {c.title}
                </h3>
                <p className="tamil text-sm text-muted">{c.tamilTitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <HeaderRow kicker="Featured" title="8th Science · Unit 2">
            <Link
              to="/lessons/$id"
              params={{ id: featuredLesson.id }}
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              Open lesson <ArrowRight className="size-4" />
            </Link>
          </HeaderRow>
          <div className="mt-8">
            <LessonCard lesson={featuredLesson} featured />
          </div>
          <div className="mt-8">
            <AdSlot placement="banner" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <HeaderRow kicker="Subjects" title="The GS shelf">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </HeaderRow>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SUBJECT_ORDER.map((key) => {
            const s = SUBJECTS[key];
            const count = lessons.filter((l) => l.subject === key).length;
            return (
              <Link
                key={key}
                to="/lessons"
                search={{ subject: key }}
                className="rounded-xl bg-cream p-4 shadow-[var(--shadow-card)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-card-hover)]"
              >
                <p className="tamil text-sm text-muted">{s.tamil}</p>
                <p className="mt-1 font-display text-lg font-semibold">
                  {s.label}
                </p>
                <p className="mt-2 text-xs text-faint tabular-nums">
                  {count} lessons
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <HeaderRow
            kicker="Popular"
            title="The lessons that built the channel"
          >
            <Link
              to="/lessons"
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </HeaderRow>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularLessons.slice(0, 6).map((l) => (
              <LessonCard key={l.id} lesson={l} />
            ))}
          </div>
          <div className="mt-8">
            <AdSlot placement="infeed" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <HeaderRow
          kicker={live ? "Live from YouTube" : "New on the desk"}
          title="Latest from the channel"
        >
          <Link
            to="/uploads"
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            All uploads <ArrowRight className="size-4" />
          </Link>
        </HeaderRow>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {live
            ? "Pulled from @tnpscgs. A new class on YouTube shows up here within a few minutes."
            : "YouTube is unreachable right now, so this is the desk catalogue."}
        </p>
        <div className="mt-8">
          <VideoGrid videos={latest} />
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.18em] text-cream/50 uppercase">
              Practice
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold">
              Mark the unit. Then sit the quiz.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65">
              Short papers drawn from the same Samacheer sentences the videos
              teach. Scores stay on this device.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link to="/practice">
                Open the practice hall
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {quizzes.slice(0, 4).map((q) => (
              <li key={q.id}>
                <Link
                  to="/practice/$id"
                  params={{ id: q.id }}
                  className="flex items-center justify-between rounded-xl bg-ink-soft px-4 py-4 hover:bg-ink-muted"
                >
                  <span>
                    <span className="block font-medium">{q.title}</span>
                    <span className="text-xs text-cream/50">
                      {q.questions.length} questions · {q.minutes} min
                    </span>
                  </span>
                  <ArrowRight className="size-4 text-cream/40" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <a
            href={CHANNEL.youtube}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col justify-between rounded-2xl bg-cream p-7 shadow-[var(--shadow-card)]"
          >
            <Youtube className="size-8 text-accent" />
            <div className="mt-8">
              <p className="text-xs tracking-wide text-muted uppercase">
                YouTube
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold">
                {CHANNEL.handle}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {CHANNEL.subscribers} subscribers · {CHANNEL.videoCount} videos
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Watch on YouTube <ArrowRight className="size-4" />
              </span>
            </div>
          </a>
          <Link
            to="/practice"
            className="flex flex-col justify-between rounded-2xl bg-ink p-7 text-cream"
          >
            <Play className="size-8 fill-cream" />
            <div className="mt-8">
              <p className="text-xs tracking-wide text-cream/50 uppercase">
                Practice
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold">
                Sit a short paper
              </h3>
              <p className="mt-2 text-sm text-cream/65">
                Questions from the same Samacheer units the videos teach.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Open the practice hall <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

function HeaderRow({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          {kicker}
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="hidden sm:block">{children}</div>
    </div>
  );
}
