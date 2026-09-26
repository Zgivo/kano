"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { hiragana, katakana } from "@/data/kana";

export type KanaProgress = {
  mastery: number;
  correct: number;
  incorrect: number;
  lastReviewed?: string;
  responseMs?: number;
  status: "new" | "learning" | "familiar" | "strong" | "mastered";
};

type KanoState = {
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

const seededProgress = [...hiragana.slice(0, 34), ...katakana.slice(0, 27)].reduce<Record<string, KanaProgress>>((result, item, index) => {
  const mastery = [92, 96, 100, 94, 91, 88][index % 6];
  result[item.id] = { mastery, correct: 12 + (index % 6), incorrect: index % 3, status: mastery >= 90 ? "mastered" : "strong", lastReviewed: new Date(Date.now() - index * 36e5).toISOString(), responseMs: 1450 + index * 23 };
  return result;
}, {});

Object.assign(seededProgress, {
  "katakana-shi": { mastery: 42, correct: 8, incorrect: 5, status: "learning", responseMs: 4300 },
  "katakana-tsu": { mastery: 38, correct: 7, incorrect: 5, status: "learning", responseMs: 5100 },
  "katakana-so": { mastery: 45, correct: 9, incorrect: 4, status: "learning", responseMs: 3900 },
  "katakana-n": { mastery: 48, correct: 9, incorrect: 4, status: "learning", responseMs: 3700 },
});

const initial = {
  name: "Mark",
  xp: 1240,
  streak: 7,
  dailyMinutes: 12,
  dailyGoal: 15,
  questions: 32,
  correct: 27,
  studySeconds: 15 * 60,
  progress: seededProgress,
  onboardingComplete: false,
};

export const useKanoStore = create<KanoState>()(persist((set) => ({
  ...initial,
  updateAnswer: (id, isCorrect, responseMs) => set((state) => {
    const current = state.progress[id] ?? { mastery: 0, correct: 0, incorrect: 0, status: "new" as const };
    const correct = current.correct + (isCorrect ? 1 : 0);
    const incorrect = current.incorrect + (isCorrect ? 0 : 1);
    const speedBoost = responseMs < 3000 ? 2 : responseMs > 8000 ? -1 : 0;
    const change = isCorrect ? 8 + speedBoost : -10;
    const mastery = Math.max(0, Math.min(100, current.mastery + change));
    return {
      xp: state.xp + (isCorrect ? 5 : 0),
      questions: state.questions + 1,
      correct: state.correct + (isCorrect ? 1 : 0),
      studySeconds: state.studySeconds + Math.max(1, Math.round(responseMs / 1000)),
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
  reset: () => set(initial),
}), { name: "kano-progress-v1" }));
