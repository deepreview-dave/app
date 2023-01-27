import create from "zustand";
import { WorkHistory } from "../business/common";

export type ResumeDetailsState = {
  name: string;
  address: string;
  phone: string;
  email: string;
  edited: boolean;
  result: string;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setResult: (result: string) => void;
};

export type ResumeSummaryState = {
  question: string;
  history: WorkHistory;
  skills: string;
  summary: string;
  edited: boolean;
  result: string;
  setQuestion: (question: string) => void;
  setHistory: (history: WorkHistory) => void;
  setSkills: (skills: string) => void;
  setSummary: (summary: string) => void;
  setResult: (result: string) => void;
};

export type ResumeWorkHistory = {
  role: string;
  company: string;
  start: string;
  end: string;
  details: string;
  edited: boolean;
  result: string;
};

export const isValidWorkHistory = (history: ResumeWorkHistory) =>
  history.role && history.company && history.start && history.end;

const NewWorkHistory = (): ResumeWorkHistory => ({
  company: "",
  role: "",
  start: "",
  end: "",
  details: "",
  edited: false,
  result: "",
});

export type ResumeHistoryState = {
  question: string;
  items: ResumeWorkHistory[];
  setQuestion: (question: string) => void;
  addHistory: () => void;
  removeHistory: (index: number) => void;
  setHistory: (index: number, history: ResumeWorkHistory) => void;
  setResult: (histories: string[]) => void;
};

export type ResumeEducationHistory = {
  school: string;
  degree: string;
  start: string;
  end: string;
  details: string;
  edited: boolean;
  result: string;
};

export const isValidEducationHistory = (history: ResumeEducationHistory) =>
  history.school && history.degree && history.start && history.end;

const NewEducationHistory = (): ResumeEducationHistory => ({
  school: "",
  degree: "",
  start: "",
  end: "",
  details: "",
  edited: false,
  result: "",
});

export type ResumeEducationState = {
  question: string;
  items: ResumeEducationHistory[];
  setQuestion: (question: string) => void;
  addHistory: () => void;
  removeHistory: (index: number) => void;
  setHistory: (index: number, history: ResumeEducationHistory) => void;
  setResult: (educations: string[]) => void;
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
  edited: false,
  result: "",
  setName: (name: string) => set((state) => ({ ...state, name, edited: true })),
  setAddress: (address: string) =>
    set((state) => ({ ...state, address, edited: true })),
  setPhone: (phone: string) =>
    set((state) => ({ ...state, phone, edited: true })),
  setEmail: (email: string) =>
    set((state) => ({ ...state, email, edited: true })),
  setResult: (result: string) =>
    set((state) => ({ ...state, edited: false, result })),
}));

export const useResumeSummaryState = create<ResumeSummaryState>()((set) => ({
  question:
    "Please write the summary section of a resume and include the following details:",
  history: WorkHistory.Five,
  skills: "",
  summary: "",
  edited: false,
  result: "",
  setQuestion: (question: string) =>
    set((state) => ({ ...state, question, edited: true })),
  setHistory: (history: WorkHistory) =>
    set((state) => ({ ...state, history, edited: true })),
  setSkills: (skills: string) =>
    set((state) => ({ ...state, skills, edited: true })),
  setSummary: (summary: string) =>
    set((state) => ({ ...state, summary, edited: true })),
  setResult: (result: string) =>
    set((state) => ({ ...state, edited: false, result })),
}));

export const useResumeWorkHistoryState = create<ResumeHistoryState>()(
  (set) => ({
    question:
      "Plase add more details to the following work history section, in the context of a resume:",
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
        const items = state.items.map((e, i) =>
          i === index ? { ...history, edited: true } : e
        );
        return { ...state, items };
      }),
    setResult: (histories: string[]) =>
      set((state) => {
        const items = state.items.map((e, i) => ({
          ...e,
          edited: false,
          result: histories[i],
        }));
        return { ...state, items };
      }),
  })
);

export const useResumeEducationHistoryState = create<ResumeEducationState>()(
  (set) => ({
    question:
      "Please add more details to the following education history section, in the context of a resume:",
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
        const items = state.items.map((e, i) =>
          i === index ? { ...history, edited: true } : e
        );
        return { ...state, items };
      }),
    setResult: (educations: string[]) =>
      set((state) => {
        const items = state.items.map((e, i) => ({
          ...e,
          edited: false,
          result: educations[i],
        }));
        return { ...state, items };
      }),
  })
);

export const useResumeState = create<ResumeState>()((set) => ({
  step: ResumeStep.Details,
  setStep: (step: number) => set((state) => ({ ...state, step })),
}));
