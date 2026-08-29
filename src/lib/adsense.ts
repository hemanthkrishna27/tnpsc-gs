import { create } from "zustand";

export type AdPlacement = "banner" | "infeed" | "sidebar" | "multiplex";

export const LIVE_ADSENSE = {
  publisherId: "ca-pub-4969760229513434",
  autoAds: true,
  slots: {
    banner: "2449094547",
    infeed: "5099308617",
    sidebar: "1787961015",
    multiplex: "4411194279",
  },
  infeedLayoutKey: "-fb+5w+4e-db+86",
} as const;

export type AdsenseState = {
  publisherId: string;
  autoAds: boolean;
  slots: Record<AdPlacement, string>;
  ready: boolean;
  hydrate: () => void;
  save: (patch: {
    publisherId: string;
    autoAds: boolean;
    slots: Record<AdPlacement, string>;
  }) => { ok: true } | { ok: false; error: string };
};

const KEY = "tnpsc-gs-adsense-v2";

export const PLACEMENTS: {
  id: AdPlacement;
  label: string;
  hint: string;
}[] = [
  { id: "banner", label: "Banner slot ID", hint: "Display → Responsive. Top and bottom of every page." },
  { id: "infeed", label: "In-feed slot ID", hint: "In-feed. Lesson catalogue and mid-article." },
  { id: "sidebar", label: "Sidebar slot ID", hint: "Display → Responsive rectangle. Lesson pages." },
  { id: "multiplex", label: "Multiplex slot ID", hint: "Multiplex / matched content. End of a lesson." },
];

export function normalizePublisherId(raw: string): string | null {
  const t = raw.trim().replace(/\s/g, "");
  if (!t) return "";
  const m = t.match(/^(?:ca-)?pub-(\d{10,22})$/i);
  if (!m) return null;
  return `ca-pub-${m[1]}`;
}

export function adsTxtLine(publisherId: string): string {
  const pub = publisherId.replace(/^ca-/i, "");
  return `google.com, ${pub}, DIRECT, f08c47fec0942fa0`;
}

function liveSlots(): Record<AdPlacement, string> {
  return { ...LIVE_ADSENSE.slots };
}

function liveConfig() {
  return {
    publisherId: LIVE_ADSENSE.publisherId,
    autoAds: LIVE_ADSENSE.autoAds,
    slots: liveSlots(),
  };
}

function load(): Pick<AdsenseState, "publisherId" | "autoAds" | "slots"> {
  const fallback = liveConfig();
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const p = JSON.parse(raw) as Partial<AdsenseState>;
    const publisherId =
      typeof p.publisherId === "string"
        ? (normalizePublisherId(p.publisherId) ?? "")
        : "";
    if (!publisherId) return fallback;
    return {
      publisherId,
      autoAds: p.autoAds !== false,
      slots: {
        banner: p.slots?.banner || LIVE_ADSENSE.slots.banner,
        infeed: p.slots?.infeed || LIVE_ADSENSE.slots.infeed,
        sidebar: p.slots?.sidebar || LIVE_ADSENSE.slots.sidebar,
        multiplex: p.slots?.multiplex || LIVE_ADSENSE.slots.multiplex,
      },
    };
  } catch {
    return fallback;
  }
}

export const useAdsense = create<AdsenseState>((set) => ({
  ...liveConfig(),
  ready: true,
  hydrate: () => set({ ...load(), ready: true }),
  save: (patch) => {
    const id = normalizePublisherId(patch.publisherId);
    if (id === null) {
      return {
        ok: false,
        error: "Publisher ID should look like ca-pub-1234567890123456.",
      };
    }
    const slots: Record<AdPlacement, string> = {
      banner: patch.slots.banner.replace(/\D/g, "").slice(0, 22),
      infeed: patch.slots.infeed.replace(/\D/g, "").slice(0, 22),
      sidebar: patch.slots.sidebar.replace(/\D/g, "").slice(0, 22),
      multiplex: patch.slots.multiplex.replace(/\D/g, "").slice(0, 22),
    };
    const next = {
      publisherId: id || LIVE_ADSENSE.publisherId,
      autoAds: patch.autoAds,
      slots: {
        banner: slots.banner || LIVE_ADSENSE.slots.banner,
        infeed: slots.infeed || LIVE_ADSENSE.slots.infeed,
        sidebar: slots.sidebar || LIVE_ADSENSE.slots.sidebar,
        multiplex: slots.multiplex || LIVE_ADSENSE.slots.multiplex,
      },
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify(next));
    }
    set(next);
    return { ok: true };
  },
}));
