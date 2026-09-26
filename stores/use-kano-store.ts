"use client";

import { create } from "zustand";

export type KanaProgress = {
  mastery: number;
  correct: number;
  incorrect: number;
  lastReviewed?: string;
  responseMs?: number;
  status: "new" | "learning" | "familiar" | "strong" | "mastered";
};

export type ProgressSnapshot = {
  name: string;
  xp: number;
  streak: number;
  dailyMinutes: number;
  dailyGoal: number;
  questions: number;
  correct: number;
  studySeconds: number;
  progress: Record<string, KanaProgress>;
  onboardingComplete: boolean;
};

type KanoState = ProgressSnapshot & {
  identityKey: string;
  hydrated: boolean;
  loadIdentity: (identityKey: string, fallbackName?: string) => void;
  hydrate: (snapshot: Partial<ProgressSnapshot>) => void;
  updateAnswer: (id: string, isCorrect: boolean, responseMs: number) => void;
  remember: (id: string) => void;
  setDailyGoal: (goal: number) => void;
  setName: (name: string) => void;
  completeOnboarding: () => void;
  reset: () => void;
};

const statusFor = (mastery: number, correct: number): KanaProgress["status"] => {
  if (mastery >= 90 && correct >= 10) return "mastered";
  if (mastery >= 75) return "strong";
  if (mastery >= 50) return "familiar";
  if (mastery > 0) return "learning";
  return "new";
};

export const blankProgress = (name = "Learner"): ProgressSnapshot => ({
  name,
  xp: 0,
  streak: 0,
  dailyMinutes: 0,
  dailyGoal: 15,
  questions: 0,
  correct: 0,
  studySeconds: 0,
  progress: {},
  onboardingComplete: false,
});

const storageKey = (identityKey: string) => `kano-progress-v2:${identityKey}`;

const readLocal = (identityKey: string, fallbackName?: string): ProgressSnapshot => {
  const empty = blankProgress(fallbackName);
  if (typeof window === "undefined") return empty;
  try {
    const saved = window.localStorage.getItem(storageKey(identityKey));
    return saved ? { ...empty, ...JSON.parse(saved) } : empty;
  } catch {
    return empty;
  }
};

export const selectProgressSnapshot = (state: KanoState): ProgressSnapshot => ({
  name: state.name,
  xp: state.xp,
  streak: state.streak,
  dailyMinutes: state.dailyMinutes,
  dailyGoal: state.dailyGoal,
  questions: state.questions,
  correct: state.correct,
  studySeconds: state.studySeconds,
  progress: state.progress,
  onboardingComplete: state.onboardingComplete,
});

export const useKanoStore = create<KanoState>()((set) => ({
  ...blankProgress(),
  identityKey: "guest",
  hydrated: false,
  loadIdentity: (identityKey, fallbackName) => set({
    ...readLocal(identityKey, fallbackName),
    identityKey,
    hydrated: true,
  }),
  hydrate: (snapshot) => set((state) => ({ ...blankProgress(state.name), ...snapshot })),
  updateAnswer: (id, isCorrect, responseMs) => set((state) => {
    const current = state.progress[id] ?? { mastery: 0, correct: 0, incorrect: 0, status: "new" as const };
    const correct = current.correct + (isCorrect ? 1 : 0);
    const incorrect = current.incorrect + (isCorrect ? 0 : 1);
    const speedBoost = responseMs < 3000 ? 2 : responseMs > 8000 ? -1 : 0;
    const change = isCorrect ? 8 + speedBoost : -10;
    const mastery = Math.max(0, Math.min(100, current.mastery + change));
    const addedSeconds = Math.max(1, Math.round(responseMs / 1000));
    return {
      xp: state.xp + (isCorrect ? 5 : 0),
      questions: state.questions + 1,
      correct: state.correct + (isCorrect ? 1 : 0),
      studySeconds: state.studySeconds + addedSeconds,
      dailyMinutes: Math.floor((state.studySeconds + addedSeconds) / 60),
      progress: { ...state.progress, [id]: { mastery, correct, incorrect, responseMs, lastReviewed: new Date().toISOString(), status: statusFor(mastery, correct) } },
    };
  }),
  remember: (id) => set((state) => {
    const current = state.progress[id] ?? { mastery: 0, correct: 0, incorrect: 0, status: "new" as const };
    const mastery = Math.min(100, current.mastery + 12);
    return { progress: { ...state.progress, [id]: { ...current, mastery, status: statusFor(mastery, current.correct) } } };
  }),
  setDailyGoal: (dailyGoal) => set({ dailyGoal }),
  setName: (name) => set({ name }),
  completeOnboarding: () => set({ onboardingComplete: true }),
  reset: () => set((state) => ({ ...blankProgress(state.name), identityKey: state.identityKey, hydrated: true })),
}));

if (typeof window !== "undefined") {
  useKanoStore.subscribe((state) => {
    if (!state.hydrated) return;
    window.localStorage.setItem(storageKey(state.identityKey), JSON.stringify(selectProgressSnapshot(state)));
  });
}
