import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LIVE_ADSENSE,
  PLACEMENTS,
  adsTxtLine,
  normalizePublisherId,
  useAdsense,
  type AdPlacement,
} from "@/lib/adsense";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/adsense")({ component: AdsensePage });

function AdsensePage() {
  const stored = useAdsense();
  const [publisherId, setPublisherId] = useState<string>(LIVE_ADSENSE.publisherId);
  const [autoAds, setAutoAds] = useState(true);
  const [slots, setSlots] = useState<Record<AdPlacement, string>>({
    ...LIVE_ADSENSE.slots,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stored.ready) return;
    setPublisherId(stored.publisherId);
    setAutoAds(stored.autoAds);
    setSlots(stored.slots);
  }, [stored.ready, stored.publisherId, stored.autoAds, stored.slots]);

  const normalized = normalizePublisherId(publisherId);
  const live = Boolean(stored.publisherId);

  function onSave(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const result = stored.save({ publisherId, autoAds, slots });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setMessage(
      normalizePublisherId(publisherId)
        ? "AdSense is on. Reload once if Google’s script was already on the page."
        : "Publisher ID cleared. House ads will fill the slots.",
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        Monetise
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
        Google AdSense
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Your AdSense account is wired into every reserved slot. Auto ads load
        from the same publisher ID. Use this page only if you need to swap a
        unit later.
      </p>

      <div className="mt-8 rounded-2xl bg-ink p-6 text-cream">
        <p className="text-xs tracking-[0.18em] text-accent uppercase">
          Live
        </p>
        <p className="mt-2 font-mono text-sm">{LIVE_ADSENSE.publisherId}</p>
        <ul className="mt-4 space-y-1.5 font-mono text-xs text-cream/70">
          <li>banner · {LIVE_ADSENSE.slots.banner}</li>
          <li>in-feed · {LIVE_ADSENSE.slots.infeed}</li>
          <li>sidebar · {LIVE_ADSENSE.slots.sidebar}</li>
          <li>multiplex · {LIVE_ADSENSE.slots.multiplex}</li>
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-cream/55">
          Keep Auto ads on in the AdSense dashboard. ads.txt is already at
          /ads.txt for this publisher.
        </p>
      </div>

      <div
        className={cn(
          "mt-8 rounded-xl px-4 py-3 text-sm",
          live ? "bg-success-soft text-success" : "bg-paper-2 text-muted",
        )}
      >
        {live
          ? `Live · ${stored.publisherId}${stored.autoAds ? " · Auto ads on" : ""}`
          : "House ads · waiting for a publisher ID"}
      </div>

      <form
        onSubmit={onSave}
        className="mt-8 space-y-6 rounded-2xl bg-cream p-6 shadow-[var(--shadow-card)] sm:p-8"
      >
        <div>
          <label htmlFor="pub" className="text-sm font-medium">
            Publisher ID
          </label>
          <Input
            id="pub"
            className="mt-2 font-mono"
            placeholder="ca-pub-1234567890123456"
            value={publisherId}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setPublisherId(e.target.value)}
          />
          <p className="mt-2 text-xs text-muted">
            From AdSense → Account → Account information. `pub-…` is accepted
            and stored as `ca-pub-…`.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={autoAds}
          onClick={() => setAutoAds((v) => !v)}
          className="flex w-full items-center justify-between gap-4 rounded-xl bg-paper px-4 py-3 text-left"
        >
          <span>
            <span className="block text-sm font-medium">Auto ads</span>
            <span className="text-xs text-muted">
              Keep this on after you enable Auto ads in the AdSense dashboard.
              Display units below still need their own slot IDs.
            </span>
          </span>
          <span
            className={cn(
              "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150",
              autoAds ? "bg-accent" : "bg-border",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-6 rounded-full bg-cream transition-transform duration-150",
                autoAds && "translate-x-5",
              )}
            />
          </span>
        </button>

        <div>
          <p className="text-sm font-medium">Display units (optional)</p>
          <p className="mt-1 text-xs text-muted">
            Create units in AdSense → Ads → By ad unit, then paste the slot
            IDs. Empty slots keep the house ad.
          </p>
          <div className="mt-4 space-y-4">
            {PLACEMENTS.map((p) => (
              <div key={p.id}>
                <label htmlFor={`slot-${p.id}`} className="text-xs text-muted">
                  {p.label}
                </label>
                <Input
                  id={`slot-${p.id}`}
                  className="mt-1 font-mono"
                  placeholder="1234567890"
                  inputMode="numeric"
                  value={slots[p.id]}
                  onChange={(e) =>
                    setSlots((s) => ({ ...s, [p.id]: e.target.value }))
                  }
                />
                <p className="mt-1 text-xs text-faint">{p.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-accent">{error}</p>}
        {message && <p className="text-sm text-success">{message}</p>}

        <Button type="submit" size="lg">
          Save AdSense
        </Button>
      </form>

      {typeof normalized === "string" && normalized && (
        <div className="mt-8 rounded-2xl bg-ink p-6 text-cream">
          <p className="text-xs tracking-[0.18em] text-cream/50 uppercase">
            ads.txt
          </p>
          <p className="mt-2 text-sm text-cream/70">
            After Google approves the site, this line must be served at{" "}
            <code className="text-cream">/ads.txt</code>. Copy it into the
            file at the domain root.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-ink-soft px-4 py-3 font-mono text-xs">
            {adsTxtLine(normalized)}
          </pre>
        </div>
      )}

      <div className="mt-10">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Preview · banner
        </p>
        <div className="mt-3">
          <AdSlot placement="banner" />
        </div>
      </div>
    </div>
  );
}
