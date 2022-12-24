import create from "zustand";
import { Analytics } from "../business/analytics";

import {
  PerformanceScore,
  TimePeriod,
  WorkAttribute,
} from "../business/common";

export enum AppStatus {
  LOADING = "loading",
  STABLE = "stable",
}

export type Result = string;

interface ReviewInputs {
  name: string;
  score: PerformanceScore;
  attributes: WorkAttribute[];
  role?: string;
  department?: string;
  timePeriod?: TimePeriod;
}

interface AppState {
  status: AppStatus;
  inputEnabled: boolean;
  inputs: ReviewInputs;
  answer: Result;
  hasSomeAnswer: boolean;
  clearInputs: () => void;
  updateName: (name: string) => void;
  updateRole: (role: string) => void;
  updateDepartment: (role: string) => void;
  updatePerformanceScore: (score: PerformanceScore) => void;
  updateTimePeriod: (timePeriod: TimePeriod | undefined) => void;
  addAttribute: (attribute: WorkAttribute) => void;
  removeAttribute: (attribute: WorkAttribute) => void;
  generateAnswer: (
    name: string,
    performanceScore: PerformanceScore,
    attributes: WorkAttribute[],
    role?: string,
    department?: string,
    timePeriod?: TimePeriod
  ) => Promise<void>;
  copyAnswer: () => void;
}

const DEFAULT_ANSWER: Result = "<Press 'Generate' to create a review>";

export const useAppState = create<AppState>()((set) => ({
  status: AppStatus.STABLE,
  inputEnabled: true,
  inputs: {
    name: "",
    score: PerformanceScore.MEETS_EXPECTATIONS,
    attributes: [],
    role: undefined,
    department: undefined,
    timePeriod: undefined,
  },
  attributeModal: {
    selectedType: undefined,
    isOpened: false,
  },
  answer: DEFAULT_ANSWER,
  hasSomeAnswer: false,
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
      hasSomeAnswer: false,
    })),
  updateName: (name: string) =>
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        name,
      },
    })),
  updateRole: (role: string) =>
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        role,
      },
    })),
  updateDepartment: (department: string) =>
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        department,
      },
    })),
  updatePerformanceScore: (score: PerformanceScore) =>
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        score,
      },
    })),
  updateTimePeriod: (timePeriod: TimePeriod | undefined) =>
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        timePeriod,
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
    timePeriod?: TimePeriod
  ) => {
    set((state) => ({
      ...state,
      status: AppStatus.LOADING,
      inputEnabled: false,
    }));

    const autoGeneratePerfReviewParams = new URLSearchParams();
    autoGeneratePerfReviewParams.append("name", name);
    autoGeneratePerfReviewParams.append("performanceScore", performanceScore);
    autoGeneratePerfReviewParams.append(
      "attributes",
      JSON.stringify(attributes)
    );
    if (role !== undefined) {
      autoGeneratePerfReviewParams.append("role", role);
    }
    if (department !== undefined) {
      autoGeneratePerfReviewParams.append("department", department);
    }
    if (timePeriod !== undefined) {
      autoGeneratePerfReviewParams.append("timePeriod", timePeriod);
    }

    let answer = "";
    let hasSomeAnswer = false;
    try {
      const response = await fetch(
        `/auto-generate-perf-review?${autoGeneratePerfReviewParams}`
      );

      if (response.ok) {
        answer = await response.text();
        hasSomeAnswer = true;
      } else {
        const errorAnswer = await response.text();
        answer = `An error occurred: ${response.status} ${response.statusText} ${errorAnswer}`;
        hasSomeAnswer = false;
      }
    } catch (e) {
      console.log(`An error occurred: ${e}`);
      answer = `An error occurred: ${e}`;
      hasSomeAnswer = false;
    }

    const status = AppStatus.STABLE;
    const inputEnabled = true;

    Analytics.generated({
      hasSetDepartment: !!department,
      hasSetPeriod: !!timePeriod,
      hasSetRole: !!role,
      hasSetNumberOfAttributes: attributes.length,
    });

    set((state) => ({
      ...state,
      status,
      inputEnabled,
      answer,
      hasSomeAnswer,
    }));
  },
  copyAnswer: () => {
    Analytics.copied();
    set((state) => state);
  },
}));
