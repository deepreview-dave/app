import create from "zustand";
import { WorkHistory } from "../business/common";

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

export type ResumeHistory = {
  role: string;
  company: string;
  start: string;
  end: string;
  details: string;
};

const NewHistory = (): ResumeHistory => ({
  company: "",
  role: "",
  start: "",
  end: "",
  details: "",
});

export type ResumeHistoryState = {
  question: string;
  items: ResumeHistory[];
  setQuestion: (question: string) => void;
  addHistory: () => void;
  removeHistory: (index: number) => void;
  setHistory: (index: number, history: ResumeHistory) => void;
};

export enum ResumeStep {
  Details,
  Summary,
  Workplaces,
  Education,
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

export const useResumeHistoryState = create<ResumeHistoryState>()((set) => ({
  question:
    "Please expand a bit on each of the following work history sections:",
  items: [NewHistory()],
  setQuestion: (question: string) => set((state) => ({ ...state, question })),
  addHistory: () =>
    set((state) => {
      const items = [...state.items, NewHistory()];
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
}));

export const useResumeState = create<ResumeState>()((set) => ({
  step: ResumeStep.Details,
  setStep: (step: number) => set((state) => ({ ...state, step })),
}));
