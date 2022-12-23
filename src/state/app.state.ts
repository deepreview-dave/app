import create from "zustand";

import { PerformanceScore, WorkAttribute } from "../business/common";

export enum AppStatus {
  LOADING = "loading",
  STABLE = "stable",
}

export type Result = string;

interface ReviewInputs {
  name: string;
  score: PerformanceScore;
  role?: string;
  department?: string;
  attributes: WorkAttribute[];
}

interface AppState {
  status: AppStatus;
  inputEnabled: boolean;
  inputs: ReviewInputs;
  answer: Result;
  clearInputs: () => void;
  updateName: (name: string) => void;
  updateRole: (role: string) => void;
  updateDepartment: (role: string) => void;
  updatePerformanceScore: (score: PerformanceScore) => void;
  addAttribute: (attribute: WorkAttribute) => void;
  removeAttribute: (attribute: WorkAttribute) => void;
  generateAnswer: (
    name: string,
    performanceScore: PerformanceScore,
    attributes: WorkAttribute[],
    role?: string,
    department?: string,
  ) => Promise<void>;
}

const DEFAULT_ANSWER: Result = "<Press 'Generate' to create a review>";

export const useAppState = create<AppState>()((set) => ({
  status: AppStatus.STABLE,
  inputEnabled: true,
  inputs: {
    name: "",
    score: PerformanceScore.MEETS_EXPECTATIONS,
    role: undefined,
    department: undefined,
    attributes: [],
  },
  attributeModal: {
    selectedType: undefined,
    isOpened: false,
  },
  answer: DEFAULT_ANSWER,
  clearInputs: () =>
    set((state) => ({
      ...state,
      inputs: {
        name: "",
        role: undefined,
        department: undefined,
        score: PerformanceScore.MEETS_EXPECTATIONS,
        attributes: [],
      },
      answer: DEFAULT_ANSWER,
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
  addAttribute: (attribute: WorkAttribute) =>
    set((state) => {
      const attributes = [...state.inputs.attributes, attribute];
      const inputs = { ...state.inputs, attributes };
      return {
        ...state,
        inputs,
      };
    }),
  removeAttribute: (attribute: WorkAttribute) =>
    set((state) => {
      const attributes = state.inputs.attributes.filter(
        (attr) => attr.uuid !== attribute.uuid
      );
      const inputs = { ...state.inputs, attributes };
      return {
        ...state,
        inputs,
      };
    }),
  generateAnswer: async (
    name: string,
    performanceScore: PerformanceScore,
    attributes: WorkAttribute[],
    role?: string,
    department?: string,
  ) => {
    set((state) => ({
      ...state,
      status: AppStatus.LOADING,
      inputEnabled: false,
    }));

    const autoGeneratePerfReviewParams = new URLSearchParams();
    autoGeneratePerfReviewParams.append("name", name);
    autoGeneratePerfReviewParams.append("performanceScore", performanceScore);
    autoGeneratePerfReviewParams.append("attributes", JSON.stringify(attributes));
    if (role !== undefined) {
      autoGeneratePerfReviewParams.append("role", role);
    }
    if (department !== undefined) {
      autoGeneratePerfReviewParams.append("department", department);
    }

    let answer = "";
    try {
      const response = await fetch(
        `/auto-generate-perf-review?${autoGeneratePerfReviewParams}`,
      );

      if (response.ok) {
        answer = await response.text();
      } else {
        const errorAnswer = await response.text();
        answer = `An error occurred: ${response.status} ${response.statusText} ${errorAnswer}`;
      }
    } catch (e) {
      console.log(`An error occurred: ${e}`);
      answer = `An error occurred: ${e}`;
    }

    const status = AppStatus.STABLE;
    const inputEnabled = true;

    set((state) => ({
      ...state,
      status,
      inputEnabled,
      answer,
    }));
  },
}));
