import create from "zustand";

import {
  PerformanceScore,
  ReviewLanguage,
  ReviewTone,
  Pronouns,
  TimePeriod,
  WorkAttribute,
} from "../business/common";
import { PromptBuilder } from "../business/prompt-builder";

export enum AppStatus {
  LOADING = "loading",
  STABLE = "stable",
}

export type Result = string[];

interface ReviewInputs {
  name: string;
  score: PerformanceScore;
  pronoun: Pronouns;
  attributes: WorkAttribute[];
  role?: string;
  department?: string;
  timePeriod?: TimePeriod;
  reviewTone: ReviewTone;
  reviewLanguage: ReviewLanguage;
}

interface AppState {
  status: AppStatus;
  inputEnabled: boolean;
  inputs: ReviewInputs;
  answer: Result;
  hasSomeAnswer: boolean;
  clearInputs: () => void;
  updateName: (name: string) => void;
  updatePronoun: (pronoun: Pronouns) => void;
  updateRole: (role: string) => void;
  updateDepartment: (role: string) => void;
  updatePerformanceScore: (score: PerformanceScore) => void;
  updateTimePeriod: (timePeriod: TimePeriod | undefined) => void;
  updateReviewTone: (reviewTone: ReviewTone) => void;
  updateReviewLanguage: (reviewLanguage: ReviewLanguage) => void;
  addAttribute: (attribute: WorkAttribute) => void;
  removeAttribute: (attribute: WorkAttribute) => void;
  generateAnswer: (
    name: string,
    performanceScore: PerformanceScore,
    pronoun: Pronouns,
    attributes: WorkAttribute[],
    reviewTone: ReviewTone,
    reviewLanguage: ReviewLanguage,
    role?: string,
    department?: string,
    timePeriod?: TimePeriod
  ) => Promise<void>;
}

const DEFAULT_ANSWER: Result = [""];

export const useAppState = create<AppState>()((set) => ({
  status: AppStatus.STABLE,
  inputEnabled: true,
  inputs: {
    name: "",
    score: PerformanceScore.MEETS_EXPECTATIONS,
    pronoun: Pronouns.NEUTRAL,
    attributes: [],
    role: undefined,
    department: undefined,
    timePeriod: undefined,
    reviewTone: ReviewTone.NEUTRAL,
    reviewLanguage: ReviewLanguage.ENGLISH,
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
        score: PerformanceScore.MEETS_EXPECTATIONS,
        pronoun: Pronouns.NEUTRAL,
        attributes: [],
        role: undefined,
        department: undefined,
        timePeriod: undefined,
        reviewTone: ReviewTone.NEUTRAL,
        reviewLanguage: ReviewLanguage.ENGLISH,
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
  updateReviewTone: (reviewTone: ReviewTone) =>
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        reviewTone,
      },
    })),
  updateReviewLanguage: (reviewLanguage: ReviewLanguage) =>
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        reviewLanguage,
      },
    })),
  updatePronoun: (pronoun: Pronouns) =>
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        pronoun,
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
    pronoun: Pronouns,
    attributes: WorkAttribute[],
    reviewTone: ReviewTone,
    reviewLanguage: ReviewLanguage,
    role?: string,
    department?: string,
    timePeriod?: TimePeriod
  ) => {
    set((state) => ({
      ...state,
      status: AppStatus.LOADING,
      inputEnabled: false,
    }));

    console.log(
      new PromptBuilder().build({
        name,
        performanceScore,
        pronoun,
        attributes,
        reviewTone,
        reviewLanguage,
        role,
        department,
        timePeriod,
      })
    );

    const autoGeneratePerfReviewParams = new URLSearchParams();
    autoGeneratePerfReviewParams.append("name", name);
    autoGeneratePerfReviewParams.append("performanceScore", performanceScore);
    autoGeneratePerfReviewParams.append("pronoun", pronoun);
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
    autoGeneratePerfReviewParams.append("reviewTone", reviewTone);
    autoGeneratePerfReviewParams.append("reviewLanguage", reviewLanguage);

    let answer: string[] = [];
    let hasSomeAnswer = false;
    try {
      const response = await fetch(
        `/auto-generate-perf-review?${autoGeneratePerfReviewParams}`
      );

      if (response.ok) {
        const answerEnvelope = await response.json();
        answer = answerEnvelope.perfReview; // Type this!
        hasSomeAnswer = true;
      } else {
        const errorAnswer = await response.text();
        answer = [
          `An error occurred: ${response.status} ${response.statusText} ${errorAnswer}`,
        ];
        hasSomeAnswer = false;
      }
    } catch (e) {
      console.log(`An error occurred: ${e}`);
      answer = [`An error occurred: ${e}`];
      hasSomeAnswer = false;
    }

    const status = AppStatus.STABLE;
    const inputEnabled = true;

    set((state) => ({
      ...state,
      status,
      inputEnabled,
      answer,
      hasSomeAnswer,
    }));
  },
}));
