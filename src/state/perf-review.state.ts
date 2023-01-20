import create from "zustand";
import { persist } from "zustand/middleware";
import {
  PerformanceScore,
  Pronouns,
  Relationship,
  ReviewTone,
  TimePeriod,
} from "../business/common";

export type PerformanceReviewDetails = {
  details: string;
  loading: boolean;
  setDetails: (details: string) => void;
  setLoading: () => void;
};

export const usePerformanceReviewDetailsState =
  create<PerformanceReviewDetails>()((set) => ({
    details: "Default",
    loading: false,
    setDetails: (details: string) =>
      set((state) => ({ details, loading: false })),
    setLoading: () => set((state) => ({ ...state, loading: true })),
  }));

export type PerformanceReviewState = {
  relationship: Relationship;
  question: string;
  name: string;
  role: string;
  team: string;
  time: TimePeriod;
  tone: ReviewTone;
  pron: Pronouns;
  perf: PerformanceScore;
  setRelationship: (relationship: Relationship) => void;
  setQuestion: (question: string) => void;
  setName: (name: string) => void;
  setRole: (role: string) => void;
  setTeam: (team: string) => void;
  setTime: (time: TimePeriod) => void;
  setTone: (tone: ReviewTone) => void;
  setPron: (pron: Pronouns) => void;
  setPerf: (perf: PerformanceScore) => void;
};

export const usePerformanceReviewState = create<PerformanceReviewState>()(
  // persist(
  (set) => ({
    relationship: Relationship.MYSELF,
    question: "Please write a performance review with the following details:",
    name: "",
    role: "",
    team: "",
    time: TimePeriod.LAST_6_MONTHS,
    tone: ReviewTone.NEUTRAL,
    pron: Pronouns.NEUTRAL,
    perf: PerformanceScore.ABOVE_EXPECTATIONS,
    setRelationship: (relationship: Relationship) =>
      set((state) => ({ ...state, relationship })),
    setQuestion: (question: string) => set((state) => ({ ...state, question })),
    setName: (name: string) => set((state) => ({ ...state, name })),
    setRole: (role: string) => set((state) => ({ ...state, role })),
    setTeam: (team: string) => set((state) => ({ ...state, team })),
    setTime: (time: TimePeriod) => set((state) => ({ ...state, time })),
    setTone: (tone: ReviewTone) => set((state) => ({ ...state, tone })),
    setPron: (pron: Pronouns) => set((state) => ({ ...state, pron })),
    setPerf: (perf: PerformanceScore) => set((state) => ({ ...state, perf })),
  })
  // {
  //   name: "performance-review-state", // unique name
  //   getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
  // }
  // ),
);
