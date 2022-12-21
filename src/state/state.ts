import { PerformanceScore } from "../domain/smarts";
import create from "zustand";

export enum EAppStatus {
  LOADING = "loading",
  STABLE = "stable",
}

export type TResult = string;

export type TAppState = {
  status: EAppStatus;
  inputEnabled: boolean;
  reviewedName: string;
  reviewedPerformanceScore: PerformanceScore;
  answer: TResult;
  updateName: (name: string) => void;
  updatePerformanceScore: (score: PerformanceScore) => void;
  generateAnswer: (
    name: string,
    performanceScore: PerformanceScore
  ) => Promise<void>;
};

export const useAppState = create<TAppState>()((set) => ({
  status: EAppStatus.STABLE,
  inputError: undefined,
  inputEnabled: true,
  reviewedName: "",
  reviewedPerformanceScore: PerformanceScore.MEETS_EXPECTATIONS,
  answer: "<Press 'Generate' to create a review>",
  updateName: (reviewedName: string) =>
    set((state) => ({
      ...state,
      inputError: undefined,
      reviewedName,
    })),
  updatePerformanceScore: (score: PerformanceScore) =>
    set((state) => ({
      ...state,
      inputError: undefined,
      reviewedPerformanceScore: score,
    })),
  generateAnswer: async (name: string, performanceScore: PerformanceScore) => {
    set((state) => ({
      ...state,
      status: EAppStatus.LOADING,
      inputEnabled: false,
    }));

    const smartsParams = new URLSearchParams();
    smartsParams.append("name", name);
    smartsParams.append("performanceScore", performanceScore);

    let answer: string = "";
    try {
      const response = await fetch(`/smarts?${smartsParams}`, { method: "GET" });
      answer = await response.text();
    } catch (e) {
      console.log(`An error occurred: ${e}`);
      answer = "An error occurred!";
    }

    const status = EAppStatus.STABLE;
    const inputEnabled = true;
    const reviewedName = "";

    set((state) => ({
      ...state,
      status,
      inputEnabled,
      reviewedName,
      answer,
    }));
  },
}));
