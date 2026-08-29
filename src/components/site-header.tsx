import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, Menu, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CHANNEL } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useStudy } from "@/lib/store";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/uploads", label: "Uploads" },
  { to: "/lessons", label: "Lessons" },
  { to: "/courses", label: "Courses" },
  { to: "/practice", label: "Practice" },
  { to: "/alerts", label: "Alerts" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const saved = useStudy((s) => s.saved);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ink text-cream">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <img
            src="/images/logo.jpg"
            alt=""
            className="size-9 rounded-full object-cover outline-none sm:size-10"
          />
          <span className="min-w-0">
            <span className="block font-display text-[15px] font-semibold leading-none tracking-tight sm:text-base">
              {CHANNEL.name}
            </span>
            <span className="tamil mt-0.5 block text-[11px] leading-none text-cream/60">
              {CHANNEL.taglineTa}
            </span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors duration-150",
                  active
                    ? "bg-cream/10 text-cream"
                    : "text-cream/70 hover:bg-cream/5 hover:text-cream",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            to="/saved"
            className="relative flex size-11 items-center justify-center rounded-lg text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
            aria-label="Saved lessons"
          >
            <Bookmark className="size-5" strokeWidth={1.75} />
            {saved.length > 0 && (
              <span className="absolute top-1.5 right-1.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-fg tabular-nums">
                {saved.length}
              </span>
            )}
          </Link>
          <Button asChild size="sm" className="hidden gap-1.5 sm:inline-flex">
            <a href={CHANNEL.subscribe} target="_blank" rel="noreferrer">
              <Youtube className="size-4" />
              Subscribe
            </a>
          </Button>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-lg text-cream lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-cream/10 bg-ink lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-2 py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-3 text-base text-cream/90 hover:bg-cream/10"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={CHANNEL.subscribe}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg px-3 py-3 text-base text-accent"
            >
              Subscribe on YouTube
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
