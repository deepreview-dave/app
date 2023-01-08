import { WorkAttribute, WorkAttributeType } from "../business/common";
import create from "zustand";
import { generateUUID } from "../business/utils";

export enum AttributeModalStatus {
  CLOSED,
  OPEN_FOR_ADDING,
  OPEN_FOR_EDIITNG,
}

export interface AttributeModalState {
  status: AttributeModalStatus;
  existingAttribute: WorkAttribute;
  selectedType?: WorkAttributeType;
  openAttributeModalForNew: (type: WorkAttributeType) => void;
  openAttributeModalForEditing: (attribute: WorkAttribute) => void;
  updateName: (name: string) => void;
  updateDetails: (details: string) => void;
  closeAttributeModal: () => void;
}

const CreateNewWorkAttribute = (): WorkAttribute => {
  return {
    name: "",
    details: "",
    type: WorkAttributeType.PROJECT,
    uuid: generateUUID(),
  };
};

export const useModalState = create<AttributeModalState>()((set) => ({
  status: AttributeModalStatus.CLOSED,
  selectedType: undefined,
  existingAttribute: CreateNewWorkAttribute(),
  openAttributeModalForNew: (type: WorkAttributeType) =>
    set((state) => {
      return {
        ...state,
        status: AttributeModalStatus.OPEN_FOR_ADDING,
        selectedType: type,
        existingAttribute: {
          name: "",
          details: "",
          type,
          uuid: generateUUID(),
        },
      };
    }),
  openAttributeModalForEditing: (attribute: WorkAttribute) =>
    set((state) => {
      return {
        ...state,
        status: AttributeModalStatus.OPEN_FOR_EDIITNG,
        selectedType: attribute.type,
        existingAttribute: attribute,
      };
    }),
  updateName: (name: string) =>
    set((state) => ({
      ...state,
      existingAttribute: {
        ...state.existingAttribute,
        name,
      },
    })),
  updateDetails: (details: string) =>
    set((state) => ({
      ...state,
      existingAttribute: {
        ...state.existingAttribute,
        details,
      },
    })),
  closeAttributeModal: () =>
    set((state) => {
      return {
        ...state,
        status: AttributeModalStatus.CLOSED,
        selectedType: undefined,
        existingAttribute: CreateNewWorkAttribute(),
      };
    }),
}));
