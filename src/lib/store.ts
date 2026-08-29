import { create } from "zustand";

const KEY = "tnpsc-gs-study-v1";

export type QuizScore = { correct: number; total: number; at: number };

type StudyState = {
  saved: string[];
  watched: string[];
  scores: Record<string, QuizScore>;
  ready: boolean;
  hydrate: () => void;
  toggleSaved: (id: string) => void;
  markWatched: (id: string) => void;
  setScore: (quizId: string, correct: number, total: number) => void;
};

function empty() {
  return { saved: [] as string[], watched: [] as string[], scores: {} as Record<string, QuizScore> };
}

function load() {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Partial<StudyState>;
    return {
      saved: Array.isArray(p.saved) ? p.saved : [],
      watched: Array.isArray(p.watched) ? p.watched : [],
      scores: p.scores && typeof p.scores === "object" ? p.scores : {},
    };
  } catch {
    return empty();
  }
}

function persist(s: ReturnType<typeof empty>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
}

export const useStudy = create<StudyState>((set, get) => ({
  ...empty(),
  ready: false,
  hydrate: () => set({ ...load(), ready: true }),
  toggleSaved: (id) => {
    const cur = get().saved;
    const saved = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    const next = { saved, watched: get().watched, scores: get().scores };
    persist(next);
    set(next);
  },
  markWatched: (id) => {
    if (get().watched.includes(id)) return;
    const next = {
      saved: get().saved,
      watched: [...get().watched, id],
      scores: get().scores,
    };
    persist(next);
    set(next);
  },
  setScore: (quizId, correct, total) => {
    const scores = {
      ...get().scores,
      [quizId]: { correct, total, at: Date.now() },
    };
    const next = { saved: get().saved, watched: get().watched, scores };
    persist(next);
    set(next);
  },
}));
