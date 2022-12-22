import { WorkAttributeType } from "../business/common";
import create from "zustand";

export interface AttributeModalState {
  isOpened: boolean;
  selectedType?: WorkAttributeType;
  openAttributeModal: (type: WorkAttributeType) => void;
  closeAttributeModal: () => void;
}

export const useModalState = create<AttributeModalState>()((set) => ({
  isOpened: false,
  selectedType: undefined,
  openAttributeModal: (type: WorkAttributeType) =>
    set((state) => {
      return {
        ...state,
        isOpened: true,
        selectedType: type,
      };
    }),
  closeAttributeModal: () =>
    set((state) => {
      return {
        ...state,
        isOpened: false,
        selectedType: undefined,
      };
    }),
}));
