import create from "zustand";

export enum ControlStep {
  Edit,
  Review,
}

export type ControlPanelState = {
  step: ControlStep;
  isDownloading: boolean;
  seeEdit: () => void;
  seeReview: () => void;
  setDownloading: (isDownloading: boolean) => void;
};

export const useControlPanelState = create<ControlPanelState>()((set) => ({
  step: ControlStep.Edit,
  isDownloading: false,
  seeEdit: () => set((state) => ({ ...state, step: ControlStep.Edit })),
  seeReview: () => set((state) => ({ ...state, step: ControlStep.Review })),
  setDownloading: (isDownloading: boolean) =>
    set((state) => ({ ...state, isDownloading })),
}));
