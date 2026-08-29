import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { LessonCard } from "@/components/lesson-card";
import { Badge } from "@/components/ui/badge";
import {
  CLASS_LABEL,
  SUBJECTS,
  getCourse,
  lessonsForCourse,
} from "@/lib/data";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/courses_/$slug")({
  component: CoursePage,
});

function CoursePage() {
  const { slug } = Route.useParams();
  const course = getCourse(slug);
  if (!course) throw notFound();
  const ls = lessonsForCourse(course);
  const watched = useStudy((s) => s.watched);
  const done = ls.filter((l) => watched.includes(l.id)).length;

  return (
    <div>
      <div className="relative overflow-hidden bg-ink text-cream">
        <img
          src={course.cover}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-30 outline-none"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-cream/60 hover:text-cream"
          >
            <ArrowLeft className="size-4" />
            All tracks
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="accent">{CLASS_LABEL[course.classLevel]}</Badge>
            <Badge tone="paper">{SUBJECTS[course.subject].label}</Badge>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
            {course.title}
          </h1>
          <p className="tamil mt-2 text-lg text-cream/70">{course.tamilTitle}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/65">
            {course.description}
          </p>
          <p className="mt-6 text-sm tabular-nums text-cream/60">
            {done}/{ls.length} marked read
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ls.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      </div>
    </div>
  );
}
