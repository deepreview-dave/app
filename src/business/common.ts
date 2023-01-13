export enum PerformanceReviewType {
  ATTRIBUTE = "attribute-based",
  FREEFORM = "freeform",
  START_STOP_CONTINUE = "start-stop-continue",
  STRENGTH_IMPROVEMENT = "strength-improvement",
}

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

export enum WorkAttributeType {
  SKILL = "Skill",
  STRENGTH = "Strength",
  PROJECT = "Project",
  GROWTH = "Growth",
  IMPROVE = "To improve",
  GOAL = "Goal",
  FREEFORM = "Freeform",
}

export interface WorkAttribute {
  uuid: string;
  type: WorkAttributeType;
  name: string;
  details: string;
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

export interface PersonDetails {
  type: PerformanceReviewType;
  name: string;
  performanceScore: PerformanceScore;
  pronoun: Pronouns;
  relationship: Relationship;
  attributes: WorkAttribute[];
  role?: string;
  department?: string;
  timePeriod?: TimePeriod;
  reviewTone?: ReviewTone;
  reviewLanguage?: ReviewLanguage;
}
