import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/ad-slot";
import { CLASS_LABEL, SUBJECTS, courses, lessonsForCourse } from "@/lib/data";

export const Route = createFileRoute("/courses")({ component: CoursesPage });

function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        Tracks
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
        Course tracks
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        A class at a time. Finish the science shelf before you scatter across
        current affairs.
      </p>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {courses.map((c) => {
          const ls = lessonsForCourse(c);
          return (
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
              <div className="notebook-rule p-6">
                <p className="text-xs tracking-wide text-muted uppercase">
                  {CLASS_LABEL[c.classLevel]} · {SUBJECTS[c.subject].label} ·{" "}
                  {ls.length} lessons
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold group-hover:text-accent">
                  {c.title}
                </h2>
                <p className="tamil text-sm text-muted">{c.tamilTitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {c.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-10">
        <AdSlot placement="infeed" />
      </div>
    </div>
  );
}
