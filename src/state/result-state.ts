import create from "zustand";
import { AIResult } from "../business/common";

export type OperationResult = {
  original: string;
  expanded: string;
  editable: boolean;
  joined: boolean;
};

export type ResultState = {
  results: OperationResult[];
  loading: boolean;
  reloadedSection: number | undefined;
  errorMessage: string | undefined;
  setLoading: () => void;
  setReloading: (reloadedSection: number) => void;
  setResults: (results: OperationResult[]) => void;
  updateResult: (expanded: string, index: number) => void;
  addElement: (index: number) => void;
  removeElement: (index: number) => void;
  resetElement: (index: number) => void;
  setError: (errorMessage: string) => void;
  resetError: () => void;
};

export const useResultState = create<ResultState>()((set) => ({
  results: [],
  loading: false,
  reloadedSection: undefined,
  errorMessage: undefined,
  setLoading: () => set((state) => ({ ...state, loading: true })),
  setReloading: (reloadedSection: number) =>
    set((state) => ({ ...state, reloadedSection })),
  setResults: (results: OperationResult[]) =>
    set((state) => ({ results, loading: false, errorMessage: undefined })),
  updateResult: (expanded: string, index: number) =>
    set((state) => {
      const results = state.results.map((r, i) =>
        i === index ? { ...r, expanded } : r
      );
      return {
        ...state,
        results,
        reloadedSection: undefined,
        loading: false,
        errorMessage: undefined,
      };
    }),
  addElement: (index: number) =>
    set((state) => {
      const results = state.results.flatMap((e, i) =>
        i === index
          ? [e, { original: "", expanded: "", editable: true, joined: false }]
          : [e]
      );
      return { ...state, results };
    }),
  removeElement: (index: number) =>
    set((state) => {
      const results = state.results.filter((e, i) =>
        i === index ? !(e.expanded === "") : true
      );
      return { ...state, results };
    }),
  resetElement: (index: number) =>
    set((state) => {
      const results = state.results.map((e, i) =>
        i === index
          ? {
              original: e.original,
              expanded: e.original,
              editable: true,
              joined: false,
            }
          : e
      );
      return { ...state, results };
    }),
  setError: (errorMessage: string) =>
    set((state) => ({
      ...state,
      errorMessage,
      loading: false,
      reloadedSection: undefined,
    })),
  resetError: () =>
    set((state) => ({
      ...state,
      errorMessage: undefined,
    })),
}));

export const formResult = (initial: AIResult[]): OperationResult[] =>
  initial.map((original) => ({
    original: original.value,
    expanded: original.value,
    editable: original.editable,
    joined: original.joined,
  }));
