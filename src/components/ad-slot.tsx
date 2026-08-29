import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { LIVE_ADSENSE, useAdsense, type AdPlacement } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const MIN_H: Record<AdPlacement, string> = {
  banner: "min-h-[90px] sm:min-h-[110px]",
  infeed: "min-h-[140px]",
  sidebar: "min-h-[250px]",
  multiplex: "min-h-[280px]",
};

export function AdSlot({
  placement,
  className,
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const publisherId = useAdsense((s) => s.publisherId);
  const slotId = useAdsense((s) => s.slots[placement]);
  const pushed = useRef(false);

  const live = Boolean(publisherId && slotId);

  useEffect(() => {
    if (!live || pushed.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      /* script not ready — Google still fills when it loads */
    }
  }, [live]);

  return (
    <aside className={cn("w-full", className)} aria-label="Advertisement">
      <p className="mb-1.5 text-[10px] font-medium tracking-[0.2em] text-faint uppercase">
        Advertisement
      </p>
      <div
        className={cn(
          "overflow-hidden rounded-xl bg-paper-2 shadow-[0_0_0_1px_var(--color-border)]",
          MIN_H[placement],
        )}
      >
        {live ? (
          <AdIns
            placement={placement}
            publisherId={publisherId}
            slotId={slotId}
          />
        ) : (
          <div className="grid min-h-[90px] place-items-center px-4 text-xs text-faint">
            Ad unit
          </div>
        )}
      </div>
    </aside>
  );
}

function AdIns({
  placement,
  publisherId,
  slotId,
}: {
  placement: AdPlacement;
  publisherId: string;
  slotId: string;
}) {
  if (placement === "infeed") {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key={LIVE_ADSENSE.infeedLayoutKey}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
      />
    );
  }
  if (placement === "multiplex") {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client={publisherId}
        data-ad-slot={slotId}
      />
    );
  }
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={publisherId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
