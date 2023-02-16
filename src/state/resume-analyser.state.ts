import { create } from "zustand";

export type ResumeAnalyserState = {
  file: File | undefined;
  isLoading: boolean;
  error?: string;
  clearFile: () => void;
  setFile: (file: File) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
};

export const useResumeAnalyserState = create<ResumeAnalyserState>()((set) => ({
  file: undefined,
  isLoading: false,
  error: undefined,
  clearFile: () => set((state) => ({ ...state, file: undefined })),
  setFile: (file: File) => set((state) => ({ ...state, file })),
  setLoading: (isLoading: boolean) => set((state) => ({ ...state, isLoading })),
  setError: (error: string) =>
    set((state) => ({ ...state, error, isLoading: false })),
}));