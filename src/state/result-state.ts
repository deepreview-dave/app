import create from "zustand";

export type ResultState = {
  errorMessage: string | undefined;
  setError: (errorMessage: string) => void;
  resetError: () => void;
};

export const useResultState = create<ResultState>()((set) => ({
  errorMessage: undefined,
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
