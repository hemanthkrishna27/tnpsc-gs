import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AdSenseScript } from "@/components/adsense-script";
import { AdSlot } from "@/components/ad-slot";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useAdsense } from "@/lib/adsense";
import { useStudy } from "@/lib/store";

export function SiteShell({ children }: { children: ReactNode }) {
  const hydrateStudy = useStudy((s) => s.hydrate);
  const hydrateAds = useAdsense((s) => s.hydrate);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hidePageAds = /^\/practice\/.+/.test(pathname);

  useEffect(() => {
    hydrateStudy();
    hydrateAds();
  }, [hydrateStudy, hydrateAds]);

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-fg">
      <AdSenseScript />
      <SiteHeader />
      {!hidePageAds && (
        <div className="border-b border-ink/10 bg-paper-2">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <AdSlot placement="banner" />
          </div>
        </div>
      )}
      <main className="flex-1">{children}</main>
      {!hidePageAds && (
        <div className="border-t border-ink/10 bg-paper-2">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <AdSlot placement="banner" />
          </div>
        </div>
      )}
      <SiteFooter />
    </div>
  );
}
