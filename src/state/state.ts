import { getSomeData, PerformanceScore } from "../business/smarts";
import create from "zustand";

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
  updateName: (name: string) => void;
  updateRole: (role: string) => void;
  updateDepartment: (role: string) => void;
  updatePerformanceScore: (score: PerformanceScore) => void;
  generateAnswer: (
    name: string,
    performanceScore: PerformanceScore,
    role?: string,
    department?: string,
  ) => Promise<void>;
};

export const useAppState = create<TAppState>()((set) => ({
  status: EAppStatus.STABLE,
  inputEnabled: true,
  inputs: {
    name: '',
    score: PerformanceScore.MEETS_EXPECTATIONS,
    role: undefined,
    department: undefined,
  },
  answer: "<Press 'Generate' to create a review>",
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
  generateAnswer: async (name: string, performanceScore: PerformanceScore, role?: string, department?: string,) => {
    set((state) => ({
      ...state,
      status: EAppStatus.LOADING,
      inputEnabled: false,
    }));

    const input = { name, performanceScore, role, department };
    const response = await getSomeData(input);

    const answer = !!response ? response : "An error occurred!";
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
