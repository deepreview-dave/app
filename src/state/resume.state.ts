import create from "zustand";
import { AIResult, WorkHistory } from "../business/common";

export type ResumeDetailsState = {
  name: string;
  address: string;
  phone: string;
  email: string;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
};

export type ResumeSummaryState = {
  question: string;
  history: WorkHistory;
  skills: string;
  summary: string;
  setQuestion: (question: string) => void;
  setHistory: (history: WorkHistory) => void;
  setSkills: (skills: string) => void;
  setSummary: (summary: string) => void;
};

export type ResumeWorkHistory = {
  role: string;
  company: string;
  start: string;
  end: string;
  details: string;
};

export const isValidWorkHistory = (history: ResumeWorkHistory) =>
  history.role && history.company && history.start && history.end;

const NewWorkHistory = (): ResumeWorkHistory => ({
  company: "",
  role: "",
  start: "",
  end: "",
  details: "",
});

export type ResumeHistoryState = {
  question: string;
  items: ResumeWorkHistory[];
  setQuestion: (question: string) => void;
  addHistory: () => void;
  removeHistory: (index: number) => void;
  setHistory: (index: number, history: ResumeWorkHistory) => void;
};

export type ResumeEducationHistory = {
  school: string;
  degree: string;
  start: string;
  end: string;
  details: string;
};

export const isValidEducationHistory = (history: ResumeEducationHistory) =>
  history.school && history.degree && history.start && history.end;

const NewEducationHistory = (): ResumeEducationHistory => ({
  school: "",
  degree: "",
  start: "",
  end: "",
  details: "",
});

export type ResumeEducationState = {
  question: string;
  items: ResumeEducationHistory[];
  setQuestion: (question: string) => void;
  addHistory: () => void;
  removeHistory: (index: number) => void;
  setHistory: (index: number, history: ResumeEducationHistory) => void;
};

export enum ResumeStep {
  Details,
  Summary,
  Workplaces,
  Education,
  Result,
}

export type ResumeState = {
  step: ResumeStep;
  setStep: (step: ResumeStep) => void;
};

export const useResumeDetailsState = create<ResumeDetailsState>()((set) => ({
  name: "",
  address: "",
  phone: "",
  email: "",
  setName: (name: string) => set((state) => ({ ...state, name })),
  setAddress: (address: string) => set((state) => ({ ...state, address })),
  setPhone: (phone: string) => set((state) => ({ ...state, phone })),
  setEmail: (email: string) => set((state) => ({ ...state, email })),
}));

export const useResumeSummaryState = create<ResumeSummaryState>()((set) => ({
  question:
    "Please write the summary section of a resume and include the following details:",
  history: WorkHistory.Five,
  skills: "",
  summary: "",
  setQuestion: (question: string) => set((state) => ({ ...state, question })),
  setHistory: (history: WorkHistory) => set((state) => ({ ...state, history })),
  setSkills: (skills: string) => set((state) => ({ ...state, skills })),
  setSummary: (summary: string) => set((state) => ({ ...state, summary })),
}));

export const useResumeWorkHistoryState = create<ResumeHistoryState>()(
  (set) => ({
    question: "Expand just a little bit on the following:",
    items: [NewWorkHistory()],
    setQuestion: (question: string) => set((state) => ({ ...state, question })),
    addHistory: () =>
      set((state) => {
        const items = [...state.items, NewWorkHistory()];
        return { ...state, items };
      }),
    removeHistory: (index: number) =>
      set((state) => {
        const items = state.items.filter((e, i) => i !== index);
        return { ...state, items };
      }),
    setHistory: (index, history) =>
      set((state) => {
        const items = state.items.map((e, i) => (i === index ? history : e));
        return { ...state, items };
      }),
  })
);

export const useResumeEducationHistoryState = create<ResumeEducationState>()(
  (set) => ({
    question:
      "Expand just a little bit on the following, in the context of a resume:",
    items: [NewEducationHistory()],
    setQuestion: (question: string) => set((state) => ({ ...state, question })),
    addHistory: () =>
      set((state) => {
        const items = [...state.items, NewEducationHistory()];
        return { ...state, items };
      }),
    removeHistory: (index: number) =>
      set((state) => {
        const items = state.items.filter((e, i) => i !== index);
        return { ...state, items };
      }),
    setHistory: (index, history) =>
      set((state) => {
        const items = state.items.map((e, i) => (i === index ? history : e));
        return { ...state, items };
      }),
  })
);

export const useResumeState = create<ResumeState>()((set) => ({
  step: ResumeStep.Details,
  setStep: (step: number) => set((state) => ({ ...state, step })),
}));
