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
