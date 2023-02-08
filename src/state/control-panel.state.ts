import create from "zustand";

export enum ControlStep {
  Edit,
  Review,
}

export type ControlPanelState = {
  step: ControlStep;
  isDownloading: boolean;
  isEdit: boolean;
  isPreview: boolean;
  seeEdit: () => void;
  seeReview: () => void;
  setDownloading: (isDownloading: boolean) => void;
};

export const useControlPanelState = create<ControlPanelState>()((set) => ({
  step: ControlStep.Edit,
  isDownloading: false,
  isEdit: true,
  isPreview: false,
  seeEdit: () =>
    set((state) => ({
      ...state,
      step: ControlStep.Edit,
      isEdit: true,
      isPreview: false,
    })),
  seeReview: () =>
    set((state) => ({
      ...state,
      step: ControlStep.Review,
      isEdit: false,
      isPreview: true,
    })),
  setDownloading: (isDownloading: boolean) =>
    set((state) => ({ ...state, isDownloading })),
}));
