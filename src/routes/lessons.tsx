import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { LessonCard } from "@/components/lesson-card";
import { AdSlot } from "@/components/ad-slot";
import { Input } from "@/components/ui/input";
import {
  CLASS_LABEL,
  SUBJECTS,
  lessons,
  type ClassLevel,
  type Subject,
} from "@/lib/data";
import { cn } from "@/lib/cn";

type LessonsSearch = {
  q?: string;
  subject?: Subject;
  cls?: "c6" | "c7" | "c8" | "tnpsc";
};

const CLS: Record<ClassLevel, NonNullable<LessonsSearch["cls"]>> = {
  "6": "c6",
  "7": "c7",
  "8": "c8",
  tnpsc: "tnpsc",
};

const FROM_CLS: Record<string, ClassLevel> = {
  c6: "6",
  c7: "7",
  c8: "8",
  tnpsc: "tnpsc",
};

export const Route = createFileRoute("/lessons")({
  validateSearch: (raw: Record<string, unknown>): LessonsSearch => ({
    q: typeof raw.q === "string" ? raw.q : undefined,
    subject: isSubject(raw.subject) ? raw.subject : undefined,
    cls:
      typeof raw.cls === "string" && raw.cls in FROM_CLS
        ? (raw.cls as NonNullable<LessonsSearch["cls"]>)
        : undefined,
  }),
  component: LessonsPage,
});

function isSubject(v: unknown): v is Subject {
  return typeof v === "string" && v in SUBJECTS;
}

function LessonsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [draft, setDraft] = useState(search.q ?? "");

  const filtered = useMemo(() => {
    const q = (search.q ?? "").trim().toLowerCase();
    const classLevel = search.cls ? FROM_CLS[search.cls] : undefined;
    return lessons.filter((l) => {
      if (search.subject && l.subject !== search.subject) return false;
      if (classLevel && l.classLevel !== classLevel) return false;
      if (!q) return true;
      const hay = `${l.title} ${l.tamilTitle ?? ""} ${l.unitName} ${l.summary}`.toLowerCase();
      return hay.includes(q);
    });
  }, [search]);

  function setFilter(patch: LessonsSearch) {
    void navigate({
      to: "/lessons",
      search: { ...search, ...patch },
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        Catalogue
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
        Lessons
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Samacheer Kalvi units, current affairs, and the aptitude tricks — as
        taught on TNPSC GS.
      </p>

      <form
        className="relative mt-8 max-w-xl"
        onSubmit={(e) => {
          e.preventDefault();
          setFilter({ q: draft || undefined });
        }}
      >
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-faint" />
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search force, Plassey, olive ridley…"
          className="pl-10"
          aria-label="Search lessons"
        />
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip
          active={!search.cls}
          onClick={() => setFilter({ cls: undefined })}
        >
          All classes
        </FilterChip>
        {(["6", "7", "8", "tnpsc"] as ClassLevel[]).map((c) => (
          <FilterChip
            key={c}
            active={search.cls === CLS[c]}
            onClick={() =>
              setFilter({ cls: search.cls === CLS[c] ? undefined : CLS[c] })
            }
          >
            {CLASS_LABEL[c]}
          </FilterChip>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <FilterChip
          active={!search.subject}
          onClick={() => setFilter({ subject: undefined })}
        >
          All subjects
        </FilterChip>
        {(Object.keys(SUBJECTS) as Subject[]).map((s) => (
          <FilterChip
            key={s}
            active={search.subject === s}
            onClick={() =>
              setFilter({ subject: search.subject === s ? undefined : s })
            }
          >
            {SUBJECTS[s].label}
          </FilterChip>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted tabular-nums">
        {filtered.length} lesson{filtered.length === 1 ? "" : "s"}
      </p>
      {filtered.length === 0 ? (
        <p className="mt-10 rounded-xl bg-cream px-5 py-10 text-center text-sm text-muted shadow-[var(--shadow-card)]">
          Nothing matches.{" "}
          <Link to="/lessons" className="text-accent hover:underline">
            Clear filters
          </Link>
        </p>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l, i) => (
            <div key={l.id} className="contents">
              <LessonCard lesson={l} />
              {i === 2 && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <AdSlot placement="infeed" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full px-3.5 text-sm transition-colors duration-150",
        active
          ? "bg-ink text-cream"
          : "bg-cream text-muted shadow-[0_0_0_1px_var(--color-border)] hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
