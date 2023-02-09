import { create } from "zustand";
import { AIResult, Pronouns } from "../business/common";

export type PraiseState = {
  question: string;
  name: string;
  pron: Pronouns;
  what: string;
  details: string;
  result: AIResult[];
  loading: boolean;
  setQuestion: (question: string) => void;
  setName: (name: string) => void;
  setPron: (pron: Pronouns) => void;
  setWhat: (what: string) => void;
  setDetails: (details: string) => void;
  setResult: (result: AIResult[]) => void;
  setLoading: (loading: boolean) => void;
};

export const usePraiseState = create<PraiseState>()((set) => ({
  question:
    "Please write some praise for a colleague, with the following details:",
  name: "",
  pron: Pronouns.NEUTRAL,
  what: "",
  details: "",
  result: [],
  loading: false,
  setQuestion: (question: string) => set((state) => ({ ...state, question })),
  setName: (name: string) => set((state) => ({ ...state, name })),
  setPron: (pron: Pronouns) => set((state) => ({ ...state, pron })),
  setWhat: (what: string) => set((state) => ({ ...state, what })),
  setDetails: (details: string) => set((state) => ({ ...state, details })),
  setResult: (result: AIResult[]) => set((state) => ({ ...state, result })),
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
}));
