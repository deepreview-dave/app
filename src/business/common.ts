import {
  ResumeEducationHistory,
  ResumeWorkHistory,
} from "../state/resume.state";

export enum PerformanceScore {
  BELOW_EXPECTATIONS = "below-expectations",
  MEETS_EXPECTATIONS = "meets-expectations",
  ABOVE_EXPECTATIONS = "above-expectations",
}

export enum TimePeriod {
  LAST_MONTH = "1-month",
  LAST_3_MONTHS = "3-months",
  LAST_6_MONTHS = "6-months",
  LAST_12_MONTHS = "12-months",
}

export enum Pronouns {
  NEUTRAL = "they",
  HE = "he",
  HER = "her",
}

export enum ReviewTone {
  NEUTRAL = "neutral",
  FRIENDLY = "friendly",
  CRITICAL = "critical",
}

export enum ReviewLanguage {
  ENGLISH = "en-US",
  SPANISH = "es-ES",
  FRENCH = "fr-FR",
  GERMAN = "de-DE",
  ITALIAN = "it-IT",
  ROMANIAN = "ro-RO",
}

export enum Relationship {
  MYSELF = "myself",
  COLLEAGUE = "colleague",
  MANAGER = "manager",
  REPORT = "report",
}

export interface PerformanceReviewInput {
  relationship: Relationship;
  question: string;
  name: string;
  role: string;
  team: string;
  time: TimePeriod;
  tone: ReviewTone;
  pron: Pronouns;
  perf: PerformanceScore;
  details: string;
}

export interface CoverLetterInput {
  question: string;
  name: string;
  role: string;
  company: string;
  history: WorkHistory;
  details: string;
}

export interface ReferralLetterInput {
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
  details: string;
}

export interface ResumeDetailsInput {
  name: string;
  address: string;
  phone: string;
  email: string;
  linkedin?: string;
  website?: string;
}

export interface ResumeSummaryInput {
  question: string;
  history: WorkHistory;
  skills: string;
  summary: string;
}

export enum PraiseTone {
  FORMAL = "formal",
  INFORMAL = "informal",
}

export interface PraiseInput {
  question: string;
  name: string;
  pron: Pronouns;
  what: string;
  details: string;
  tone: PraiseTone;
}

export enum WorkHistory {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  TenPlus = "10+",
}

export type AIResult = {
  original: string;
  expanded: string;
  editable: boolean;
  joined: boolean;
};

export type ResumeAnalyserDetails = {
  name: string;
  address: string;
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
};

export type ResumeAnalyserSummary = {
  skills: string;
  summary: string;
};

export type ResumeAnalyserWorkHistory = {
  role: string;
  company: string;
  start: string;
  end: string;
  details: string;
};

export type ResumeAnalyserEducationHistory = {
  school: string;
  degree: string;
  start: string;
  end: string;
  details: string;
};

export type ResumeAnalyserLanguages = {
  languages: string;
};

export type ResumeAnalyserOutput = {
  details: ResumeAnalyserDetails;
  summary: ResumeAnalyserSummary;
  workplaces: ResumeAnalyserWorkHistory[];
  education: ResumeAnalyserEducationHistory[];
  languages: ResumeAnalyserLanguages;
};
