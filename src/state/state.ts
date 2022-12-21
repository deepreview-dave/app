import create from "zustand";

import { PerformanceScore } from "../business/smarts";

export enum EAppStatus {
  LOADING = "loading",
  STABLE = "stable",
}

export type TResult = string;

export enum EAttributeType {
  SKILL = "Skill",
  TRAIT = "Trait",
  PROJECT = "Project",
  GROWTH = "Growth",
  IMPROVE = "To improve",
  GOAL = "Goal",
}

export type TAttribute = {
  uuid: string;
  type: EAttributeType;
  name: string;
};

export type TAttributeModalState = {
  isOpened: boolean;
  selectedType?: EAttributeType;
};

export type TReviewInputs = {
  name: string;
  score: PerformanceScore;
  role?: string;
  department?: string;
  attributes: TAttribute[];
};

export type TAppState = {
  status: EAppStatus;
  inputEnabled: boolean;
  inputs: TReviewInputs;
  answer: TResult;
  attributeModal: TAttributeModalState;
  clearInputs: () => void;
  updateName: (name: string) => void;
  updateRole: (role: string) => void;
  updateDepartment: (role: string) => void;
  updatePerformanceScore: (score: PerformanceScore) => void;
  addAttribute: (attribute: TAttribute) => void;
  removeAttribute: (attribute: TAttribute) => void;
  openAttributeModal: (type: EAttributeType) => void;
  closeAttributeModal: () => void;
  generateAnswer: (
    name: string,
    performanceScore: PerformanceScore,
    role?: string,
    department?: string
  ) => Promise<void>;
};

const DEFAULT_ANSWER: TResult = "<Press 'Generate' to create a review>";

export const useAppState = create<TAppState>()((set) => ({
  status: EAppStatus.STABLE,
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
  addAttribute: (attribute: TAttribute) =>
    set((state) => {
      const attributes = [...state.inputs.attributes, attribute];
      const inputs = { ...state.inputs, attributes };
      return {
        ...state,
        inputs,
      };
    }),
  removeAttribute: (attribute: TAttribute) =>
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
  openAttributeModal: (type: EAttributeType) =>
    set((state) => {
      return {
        ...state,
        attributeModal: {
          isOpened: true,
          selectedType: type,
        },
      };
    }),
  closeAttributeModal: () =>
    set((state) => {
      return {
        ...state,
        attributeModal: {
          isOpened: false,
          selectedType: undefined,
        },
      };
    }),
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
