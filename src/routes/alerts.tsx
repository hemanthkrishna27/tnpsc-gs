import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { CHANNEL, alerts } from "@/lib/data";

export const Route = createFileRoute("/alerts")({ component: AlertsPage });

function AlertsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        Notice board
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
        Exam alerts
      </h1>
      <p className="mt-2 text-sm text-muted">
        Group notifications and planner notes, as posted on the channel. Always
        confirm on the official TNPSC website.
      </p>
      <ol className="mt-10 space-y-4">
        {alerts.map((a) => (
          <li
            key={a.id}
            className="notebook-rule rounded-2xl bg-cream px-6 py-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">{a.tag}</Badge>
              <span className="text-xs text-faint">{a.date}</span>
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold">
              {a.title}
            </h2>
            {a.tamilTitle && (
              <p className="tamil mt-1 text-sm text-muted">{a.tamilTitle}</p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-sm text-muted">
        Channel posts live at{" "}
        <a
          href={CHANNEL.youtube}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          {CHANNEL.handle}
        </a>
        .
      </p>
    </div>
  );
}
