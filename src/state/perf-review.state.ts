import create from "zustand";
// import { persist } from "zustand/middleware";
import {
  PerformanceScore,
  Pronouns,
  Relationship,
  ReviewTone,
  TimePeriod,
} from "../business/common";

export type PerformanceReviewDetailsState = {
  details: string;
  loading: boolean;
  setDetails: (details: string) => void;
  setLoading: () => void;
};

export const usePerformanceReviewDetailsState =
  create<PerformanceReviewDetailsState>()((set) => ({
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

export type PerformanceReviewResult = {
  original: string;
  expanded: string;
};

export type PerformanceReviewResultState = {
  results: PerformanceReviewResult[];
  loading: boolean;
  reloadedSection: number | undefined;
  errorMessage: string | undefined;
  setLoading: () => void;
  setReloading: (reloadedSection: number) => void;
  setResults: (results: PerformanceReviewResult[]) => void;
  updateResult: (expanded: string, index: number) => void;
  addElement: (index: number) => void;
  removeElement: (index: number) => void;
  resetElement: (index: number) => void;
  setError: (errorMessage: string) => void;
};

export const usePerformanceReviewResultState =
  create<PerformanceReviewResultState>()((set) => ({
    results: [],
    loading: false,
    reloadedSection: undefined,
    errorMessage: undefined,
    setLoading: () => set((state) => ({ ...state, loading: true })),
    setReloading: (reloadedSection: number) =>
      set((state) => ({ ...state, reloadedSection })),
    setResults: (results: PerformanceReviewResult[]) =>
      set((state) => ({ results, loading: false, errorMessage: undefined })),
    updateResult: (expanded: string, index: number) =>
      set((state) => {
        const results = state.results.map((r, i) =>
          i === index ? { ...r, expanded } : r
        );
        return {
          ...state,
          results,
          reloadedSection: undefined,
          loading: false,
          errorMessage: undefined,
        };
      }),
    addElement: (index: number) =>
      set((state) => {
        const results = state.results.flatMap((e, i) =>
          i === index ? [e, { original: "", expanded: "" }] : [e]
        );
        return { ...state, results };
      }),
    removeElement: (index: number) =>
      set((state) => {
        const results = state.results.filter((e, i) =>
          i === index ? !(e.expanded === "") : true
        );
        return { ...state, results };
      }),
    resetElement: (index: number) =>
      set((state) => {
        const results = state.results.map((e, i) =>
          i === index ? { original: e.original, expanded: e.original } : e
        );
        return { ...state, results };
      }),
    setError: (errorMessage: string) =>
      set((state) => ({
        ...state,
        errorMessage,
        loading: false,
        reloadedSection: undefined,
      })),
  }));

export const formResult = (initial: string[]): PerformanceReviewResult[] =>
  initial.map((original) => ({ original, expanded: original }));
