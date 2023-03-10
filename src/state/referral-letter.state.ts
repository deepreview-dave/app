import create from "zustand";
import { AIResult, Pronouns } from "../business/common";

export type ReferralLetterState = {
  question: string;
  you: {
    name: string;
    address: string;
    contact: string;
  };
  recipient: {
    name: string;
    title: string;
    company: string;
    address: string;
  };
  applicant: {
    name: string;
    role: string;
    pron: Pronouns;
  };
  result: AIResult[];
  loading: boolean;
  setQuestion: (question: string) => void;
  setYourName: (name: string) => void;
  setYourAddress: (address: string) => void;
  setYourContact: (contact: string) => void;
  setRecipientName: (name: string) => void;
  setRecipientTitle: (title: string) => void;
  setRecipientCompany: (company: string) => void;
  setRecipientAddress: (address: string) => void;
  setApplicantName: (name: string) => void;
  setApplicantRole: (role: string) => void;
  setApplicantPronoun: (pron: Pronouns) => void;
  setResult: (result: AIResult[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useReferralLetterState = create<ReferralLetterState>()((set) => ({
  question: "Please write a referral letter with the following details:",
  you: {
    name: "",
    address: "",
    contact: "",
  },
  recipient: {
    name: "",
    title: "",
    company: "",
    address: "",
  },
  applicant: {
    name: "",
    role: "",
    pron: Pronouns.NEUTRAL,
  },
  result: [],
  loading: false,
  setQuestion: (question: string) => set((state) => ({ ...state, question })),
  setYourName: (name: string) =>
    set((state) => ({ ...state, you: { ...state.you, name } })),
  setYourAddress: (address: string) =>
    set((state) => ({ ...state, you: { ...state.you, address } })),
  setYourContact: (contact: string) =>
    set((state) => ({ ...state, you: { ...state.you, contact } })),
  setRecipientName: (name: string) =>
    set((state) => ({ ...state, recipient: { ...state.recipient, name } })),
  setRecipientTitle: (title: string) =>
    set((state) => ({ ...state, recipient: { ...state.recipient, title } })),
  setRecipientCompany: (company: string) =>
    set((state) => ({ ...state, recipient: { ...state.recipient, company } })),
  setRecipientAddress: (address: string) =>
    set((state) => ({ ...state, recipient: { ...state.recipient, address } })),
  setApplicantName: (name: string) =>
    set((state) => ({ ...state, applicant: { ...state.applicant, name } })),
  setApplicantRole: (role: string) =>
    set((state) => ({ ...state, applicant: { ...state.applicant, role } })),
  setApplicantPronoun: (pron: Pronouns) =>
    set((state) => ({ ...state, applicant: { ...state.applicant, pron } })),
  setResult: (result: AIResult[]) => set((state) => ({ ...state, result })),
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
}));
