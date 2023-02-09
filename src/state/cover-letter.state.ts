import { create } from "zustand";
import { AIResult, WorkHistory } from "../business/common";

export type CoverLetterState = {
  question: string;
  name: string;
  role: string;
  company: string;
  history: WorkHistory;
  result: AIResult[];
  loading: boolean;
  setQuestion: (question: string) => void;
  setName: (name: string) => void;
  setRole: (role: string) => void;
  setCompany: (company: string) => void;
  setHistory: (history: WorkHistory) => void;
  setResult: (result: AIResult[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useCoverLetterState = create<CoverLetterState>()((set) => ({
  question: "Please write a cover letter with the following details:",
  name: "",
  role: "",
  company: "",
  history: WorkHistory.Five,
  result: [],
  loading: false,
  setQuestion: (question: string) => set((state) => ({ ...state, question })),
  setName: (name: string) => set((state) => ({ ...state, name })),
  setRole: (role: string) => set((state) => ({ ...state, role })),
  setCompany: (company: string) => set((state) => ({ ...state, company })),
  setHistory: (history: WorkHistory) => set((state) => ({ ...state, history })),
  setResult: (result: AIResult[]) => set((state) => ({ ...state, result })),
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
}));
