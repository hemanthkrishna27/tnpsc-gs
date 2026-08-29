import { Link } from "@tanstack/react-router";
import { CHANNEL } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="tamil font-display text-2xl font-semibold tracking-tight">
            {CHANNEL.taglineTa}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/65">
            {CHANNEL.blurb} A companion to the {CHANNEL.handle} classroom on
            YouTube.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-medium tracking-[0.14em] text-cream/45 uppercase">
            Study
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/uploads" className="hover:text-accent">
                New uploads
              </Link>
            </li>
            <li>
              <Link to="/lessons" className="hover:text-accent">
                All lessons
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-accent">
                Course tracks
              </Link>
            </li>
            <li>
              <Link to="/practice" className="hover:text-accent">
                Practice quizzes
              </Link>
            </li>
            <li>
              <Link to="/saved" className="hover:text-accent">
                Saved
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs font-medium tracking-[0.14em] text-cream/45 uppercase">
            Channel
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={CHANNEL.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                YouTube {CHANNEL.handle}
              </a>
            </li>
            <li>
              <Link to="/alerts" className="hover:text-accent">
                Exam alerts
              </Link>
            </li>
            <li>
              <Link to="/adsense" className="hover:text-accent">
                Google AdSense
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent">
                About the desk
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-cream/45 sm:px-6">
          Independent study companion for {CHANNEL.name}. Not affiliated with
          the Tamil Nadu Public Service Commission.
        </p>
      </div>
    </footer>
  );
}
