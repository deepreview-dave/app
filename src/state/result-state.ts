import create from "zustand";

export type ResultState = {
  loading: boolean;
  errorMessage: string | undefined;
  setLoading: () => void;
  setNotLoading: () => void;
  setError: (errorMessage: string) => void;
  resetError: () => void;
};

export const useResultState = create<ResultState>()((set) => ({
  loading: false,
  errorMessage: undefined,
  setLoading: () => set((state) => ({ ...state, loading: true })),
  setNotLoading: () => set((state) => ({ ...state, loading: false })),
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
