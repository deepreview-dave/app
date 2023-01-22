import create from "zustand";

export type InputDetailsState = {
  details: string;
  loading: boolean;
  setDetails: (details: string) => void;
  setLoading: () => void;
};

export const useInputDetailsState = create<InputDetailsState>()((set) => ({
  details: "Default",
  loading: false,
  setDetails: (details: string) =>
    set((state) => ({ details, loading: false })),
  setLoading: () => set((state) => ({ ...state, loading: true })),
}));
