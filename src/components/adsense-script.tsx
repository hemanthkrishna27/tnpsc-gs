import { useEffect } from "react";
import { LIVE_ADSENSE, useAdsense } from "@/lib/adsense";

const SCRIPT_ID = "tnpsc-adsense-js";
const META_NAME = "google-adsense-account";

export function AdSenseScript() {
  const publisherId = useAdsense((s) => s.publisherId) || LIVE_ADSENSE.publisherId;

  useEffect(() => {
    const existingMeta = document.querySelector(`meta[name="${META_NAME}"]`);
    let meta = existingMeta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", META_NAME);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", publisherId);

    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript?.getAttribute("data-client") === publisherId) return;
    if (
      existingScript &&
      existingScript.getAttribute("src")?.includes(publisherId)
    ) {
      existingScript.setAttribute("data-client", publisherId);
      return;
    }

    existingScript?.remove();
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`;
    script.setAttribute("data-client", publisherId);
    document.head.appendChild(script);
  }, [publisherId]);

  return null;
}
