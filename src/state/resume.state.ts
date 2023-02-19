import create from "zustand";
import {
  AIResult,
  ResumeAnalyserOutput,
  WorkHistory,
} from "../business/common";
import { OpenAIServiceUtils } from "../business/open-ai.service";

export type ResumeDetailsState = {
  name: string;
  address: string;
  phone: string;
  email: string;
  linkedin?: string;
  website?: string;
  result: AIResult[];
  loading: boolean;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setLinkedin: (linkedin: string) => void;
  setWebsite: (website: string) => void;
  setResult: (result: AIResult[]) => void;
  setLoading: (loading: boolean) => void;
  setData: (data: ResumeAnalyserOutput) => void;
};

export type ResumeSummaryState = {
  question: string;
  history: WorkHistory;
  skills: string;
  summary: string;
  result: AIResult[];
  loading: boolean;
  setQuestion: (question: string) => void;
  setHistory: (history: WorkHistory) => void;
  setSkills: (skills: string) => void;
  setSummary: (summary: string) => void;
  setResult: (result: AIResult[]) => void;
  setLoading: (loading: boolean) => void;
  setData: (data: ResumeAnalyserOutput) => void;
};

export type ResumeWorkHistory = {
  role: string;
  company: string;
  start: string;
  end: string;
  details: string;
  results: AIResult[];
  loading: boolean;
};

export const isValidWorkHistory = (history: ResumeWorkHistory) =>
  history.role && history.company && history.start && history.end;

const NewWorkHistory = (): ResumeWorkHistory => ({
  company: "",
  role: "",
  start: "",
  end: "",
  details: "",
  results: [],
  loading: false,
});

export type ResumeHistoryState = {
  question: string;
  items: ResumeWorkHistory[];
  setQuestion: (question: string) => void;
  addHistory: () => void;
  removeHistory: (index: number) => void;
  setHistory: (index: number, history: ResumeWorkHistory) => void;
  setResults: (results: AIResult[], index: number) => void;
  setLoading: (loading: boolean, index: number) => void;
  setData: (data: ResumeAnalyserOutput) => void;
};

export type ResumeEducationHistory = {
  school: string;
  degree: string;
  start: string;
  end: string;
  details: string;
  results: AIResult[];
  loading: boolean;
};

export const isValidEducationHistory = (history: ResumeEducationHistory) =>
  history.school && history.degree && history.start && history.end;

const NewEducationHistory = (): ResumeEducationHistory => ({
  school: "",
  degree: "",
  start: "",
  end: "",
  details: "",
  results: [],
  loading: false,
});

export type ResumeEducationState = {
  question: string;
  items: ResumeEducationHistory[];
  selectedIndex: number;
  setQuestion: (question: string) => void;
  addHistory: () => void;
  removeHistory: (index: number) => void;
  setHistory: (index: number, history: ResumeEducationHistory) => void;
  selectHistory: (selectedIndex: number) => void;
  setResults: (results: AIResult[], index: number) => void;
  setLoading: (loading: boolean, index: number) => void;
  setData: (data: ResumeAnalyserOutput) => void;
};

export const useResumeDetailsState = create<ResumeDetailsState>()((set) => ({
  name: "",
  address: "",
  phone: "",
  email: "",
  linkedin: "",
  website: "",
  result: [],
  loading: false,
  setName: (name: string) => set((state) => ({ ...state, name })),
  setAddress: (address: string) => set((state) => ({ ...state, address })),
  setPhone: (phone: string) => set((state) => ({ ...state, phone })),
  setEmail: (email: string) => set((state) => ({ ...state, email })),
  setLinkedin: (linkedin: string) => set((state) => ({ ...state, linkedin })),
  setWebsite: (website: string) => set((state) => ({ ...state, website })),
  setResult: (result: AIResult[]) => set((state) => ({ ...state, result })),
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
  setData: (data: ResumeAnalyserOutput) =>
    set((state) => ({
      ...state,
      name: data.details.name,
      address: data.details.address,
      phone: data.details.phone,
      email: data.details.email,
      linkedin: data.details.linkedin,
      website: data.details.website,
    })),
}));

export const useResumeSummaryState = create<ResumeSummaryState>()((set) => ({
  question:
    "Please write the summary section of a resume and include the following details:",
  history: WorkHistory.Five,
  skills: "",
  summary: "",
  result: [],
  loading: false,
  setQuestion: (question: string) => set((state) => ({ ...state, question })),
  setHistory: (history: WorkHistory) => set((state) => ({ ...state, history })),
  setSkills: (skills: string) => set((state) => ({ ...state, skills })),
  setSummary: (summary: string) => set((state) => ({ ...state, summary })),
  setResult: (result: AIResult[]) => set((state) => ({ ...state, result })),
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
  setData: (data: ResumeAnalyserOutput) =>
    set((state) => ({
      ...state,
      skills: data.summary.skills,
      summary: data.summary.summary,
      result: [
        {
          original: data.summary.summary,
          expanded: data.summary.summary,
          editable: true,
          joined: false,
        },
      ],
    })),
}));

export const useResumeWorkHistoryState = create<ResumeHistoryState>()(
  (set) => ({
    question: "Expand just a little bit on the following:",
    items: [NewWorkHistory()],
    setQuestion: (question: string) => set((state) => ({ ...state, question })),
    addHistory: () =>
      set((state) => {
        const items = [...state.items, NewWorkHistory()];
        const selectedIndex = items.length - 1;
        return { ...state, items, selectedIndex };
      }),
    removeHistory: (index: number) =>
      set((state) => {
        const items = state.items.filter((e, i) => i !== index);
        const selectedIndex = index - 1 < 0 ? 0 : index - 1;
        return { ...state, items, selectedIndex };
      }),
    setHistory: (index, history) =>
      set((state) => {
        const items = state.items.map((e, i) => (i === index ? history : e));
        return { ...state, items };
      }),
    setResults: (results: AIResult[], index: number) =>
      set((state) => {
        const items = state.items.map((e, i) =>
          i === index ? { ...e, results } : e
        );
        return { ...state, items };
      }),
    setLoading: (loading: boolean, index: number) =>
      set((state) => {
        const items = state.items.map((e, i) =>
          i === index ? { ...e, loading } : e
        );
        return { ...state, items };
      }),
    setData: (data: ResumeAnalyserOutput) =>
      set((state) => {
        const items: ResumeWorkHistory[] = data.workplaces.map((e) => ({
          role: e.role,
          company: e.company,
          start: e.start,
          end: e.end,
          details: e.details,
          results: [
            OpenAIServiceUtils.getBakedWorkResults(e),
            {
              original: e.details,
              expanded: e.details,
              editable: true,
              joined: false,
            },
          ],
          loading: false,
        }));
        return { ...state, items };
      }),
  })
);

export const useResumeEducationHistoryState = create<ResumeEducationState>()(
  (set) => ({
    question:
      "Expand just a little bit on the following, in the context of a resume:",
    items: [NewEducationHistory()],
    selectedIndex: 0,
    setQuestion: (question: string) => set((state) => ({ ...state, question })),
    addHistory: () =>
      set((state) => {
        const items = [...state.items, NewEducationHistory()];
        const selectedIndex = items.length - 1;
        return { ...state, items, selectedIndex };
      }),
    removeHistory: (index: number) =>
      set((state) => {
        const items = state.items.filter((e, i) => i !== index);
        const selectedIndex = index - 1 < 0 ? 0 : index - 1;
        return { ...state, items, selectedIndex };
      }),
    setHistory: (index, history) =>
      set((state) => {
        const items = state.items.map((e, i) => (i === index ? history : e));
        return { ...state, items };
      }),
    selectHistory: (selectedIndex: number) =>
      set((state) => ({ ...state, selectedIndex })),
    setResults: (results: AIResult[], index: number) =>
      set((state) => {
        const items = state.items.map((e, i) =>
          i === index ? { ...e, results } : e
        );
        return { ...state, items };
      }),
    setLoading: (loading: boolean, index: number) =>
      set((state) => {
        const items = state.items.map((e, i) =>
          i === index ? { ...e, loading } : e
        );
        return { ...state, items };
      }),
    setData: (data: ResumeAnalyserOutput) =>
      set((state) => {
        const items: ResumeEducationHistory[] = data.education.map((e) => ({
          school: e.school,
          degree: e.degree,
          start: e.start,
          end: e.end,
          details: e.details,
          results: [
            OpenAIServiceUtils.getBakedEducationResult(e),
            {
              original: e.details,
              expanded: e.details,
              editable: true,
              joined: false,
            },
          ],
          loading: false,
        }));
        return { ...state, items };
      }),
  })
);
