import create from "zustand";
import { AIResult, ToolName } from "../business/common";

export type ResultState = {
  results: AIResult[];
  loading: boolean;
  reloadedSection: number | undefined;
  errorMessage: string | undefined;
  setLoading: () => void;
  setReloading: (reloadedSection: number) => void;
  setResults: (results: AIResult[]) => void;
  updateResult: (expanded: string, index: number) => void;
  addElement: (index: number, tool: ToolName) => void;
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
  setResults: (results: AIResult[]) =>
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
  addElement: (index: number, tool: ToolName) =>
    set((state) => {
      const results = state.results.flatMap((e, i) =>
        i === index
          ? [
              e,
              {
                original: "",
                expanded: "",
                editable: true,
                joined: false,
                tool,
              },
            ]
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
              tool: e.tool,
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
