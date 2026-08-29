import { createFileRoute, Link } from "@tanstack/react-router";
import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHANNEL } from "@/lib/data";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <div>
      <div className="relative overflow-hidden bg-ink text-cream">
        <img
          src="/images/hero-textbook.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-35 outline-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/50" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs tracking-[0.22em] text-cream/55 uppercase">
            {CHANNEL.handle}
          </p>
          <h1 className="tamil mt-4 font-display text-4xl font-semibold sm:text-6xl">
            {CHANNEL.taglineTa}
          </h1>
          <p className="mt-3 font-display text-xl text-cream/80">
            {CHANNEL.taglineEn}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="notebook-rule space-y-6 rounded-2xl bg-cream p-6 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-base leading-relaxed">
            <strong>{CHANNEL.name}</strong> is a Tamil-medium classroom for
            TNPSC General Studies. The method is simple: open the Samacheer
            Kalvi book, teach the unit on camera, then file the same sentences
            as quiz items and current-affairs briefs.
          </p>
          <p className="text-base leading-relaxed text-muted">
            {CHANNEL.subscribers} subscribers watch {CHANNEL.videoCount} lessons
            — Class 6 to 8 science and social science, Group exam notifications,
            and the aptitude tricks that recover marks in the last twenty
            minutes of a paper.
          </p>
          <p className="text-base leading-relaxed text-muted">
            This site is a study companion to the YouTube page. Lessons here
            carry notes and a short paper; the video itself lives on YouTube.
            New uploads on {CHANNEL.handle} appear on the Uploads page within
            about ten minutes. Display ads are reserved for Google AdSense.
            Nothing here is an official TNPSC publication.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-4">
          {[
            [CHANNEL.subscribers, "Subscribers"],
            [CHANNEL.videoCount, "Videos"],
            ["Tamil", "Medium"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="rounded-xl bg-cream px-4 py-5 text-center shadow-[var(--shadow-card)]"
            >
              <dt className="text-xs tracking-wide text-muted uppercase">
                {l}
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold">
                {n}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={CHANNEL.subscribe} target="_blank" rel="noreferrer">
              <Youtube className="size-4" />
              Subscribe
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/adsense">Google AdSense</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/lessons">Start with the catalogue</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
