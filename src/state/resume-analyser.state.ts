import { create } from "zustand";

export type ResumeAnalyserState = {
  file: File | undefined;
  isLoading: boolean;
  clearFile: () => void;
  setFile: (file: File) => void;
  setLoading: (isLoading: boolean) => void;
};

export const useResumeAnalyserState = create<ResumeAnalyserState>()((set) => ({
  file: undefined,
  isLoading: false,
  clearFile: () => set((state) => ({ ...state, file: undefined })),
  setFile: (file: File) => set((state) => ({ ...state, file })),
  setLoading: (isLoading: boolean) => set((state) => ({ ...state, isLoading })),
}));
