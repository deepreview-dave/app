import create from "zustand";

import { PerformanceScore } from "../business/smarts";

export enum EAppStatus {
  LOADING = "loading",
  STABLE = "stable",
}

export type TResult = string;

export type TReviewInputs = {
  name: string;
  score: PerformanceScore;
  role?: string;
  department?: string;
};

export type TAppState = {
  status: EAppStatus;
  inputEnabled: boolean;
  inputs: TReviewInputs;
  answer: TResult;
  clearInputs: () => void;
  updateName: (name: string) => void;
  updateRole: (role: string) => void;
  updateDepartment: (role: string) => void;
  updatePerformanceScore: (score: PerformanceScore) => void;
  generateAnswer: (
    name: string,
    performanceScore: PerformanceScore,
    role?: string,
    department?: string
  ) => Promise<void>;
};

export const useAppState = create<TAppState>()((set) => ({
  status: EAppStatus.STABLE,
  inputEnabled: true,
  inputs: {
    name: "",
    score: PerformanceScore.MEETS_EXPECTATIONS,
    role: undefined,
    department: undefined,
  },
  answer: "<Press 'Generate' to create a review>",
  clearInputs: () =>
    set((state) => ({
      ...state,
      inputs: {
        name: "",
        role: undefined,
        department: undefined,
        score: PerformanceScore.MEETS_EXPECTATIONS,
      },
    })),
  updateName: (name: string) =>
    set((state) => ({
      ...state,
      inputError: undefined,
      inputs: {
        ...state.inputs,
        name,
      },
    })),
  updateRole: (role: string) =>
    set((state) => ({
      ...state,
      inputError: undefined,
      inputs: {
        ...state.inputs,
        role,
      },
    })),
  updateDepartment: (department: string) =>
    set((state) => ({
      ...state,
      inputError: undefined,
      inputs: {
        ...state.inputs,
        department,
      },
    })),
  updatePerformanceScore: (score: PerformanceScore) =>
    set((state) => ({
      ...state,
      inputError: undefined,
      inputs: {
        ...state.inputs,
        score,
      },
    })),
  generateAnswer: async (
    name: string,
    performanceScore: PerformanceScore,
    role?: string,
    department?: string
  ) => {
    set((state) => ({
      ...state,
      status: EAppStatus.LOADING,
      inputEnabled: false,
    }));

    const smartsParams = new URLSearchParams();
    smartsParams.append("name", name);
    smartsParams.append("performanceScore", performanceScore);
    if (role !== undefined) {
      smartsParams.append("role", role);
    }
    if (department !== undefined) {
      smartsParams.append("department", department);
    }

    let answer: string = "";
    try {
      const response = await fetch(`/smarts?${smartsParams}`, {
        method: "GET",
      });
      answer = await response.text();
    } catch (e) {
      console.log(`An error occurred: ${e}`);
      answer = "An error occurred!";
    }

    const status = EAppStatus.STABLE;
    const inputEnabled = true;

    set((state) => ({
      ...state,
      status,
      inputEnabled,
      answer,
    }));
  },
}));
