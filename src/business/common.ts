export enum PerformanceScore {
  BELOW_EXPECTATIONS = "below-expectations",
  MEETS_EXPECTATIONS = "meets-expectations",
  ABOVE_EXPECTATIONS = "above-expectations",
}

export enum WorkAttributeType {
  SKILL = "Skill",
  TRAIT = "Trait",
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

export interface PersonDetails {
  name: string;
  performanceScore: PerformanceScore;
  attributes: WorkAttribute[];
  role?: string;
  department?: string;
}
