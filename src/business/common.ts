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
}

export interface WorkAttribute {
  uuid: string;
  type: WorkAttributeType;
  name: string;
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

export interface PersonDetails {
  name: string;
  performanceScore: PerformanceScore;
  pronoun: Pronouns;
  attributes: WorkAttribute[];
  role?: string;
  department?: string;
  timePeriod?: TimePeriod;
  reviewTone?: ReviewTone;
}
