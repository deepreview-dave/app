import {
  PerformanceScore,
  PersonDetails,
  ReviewLanguage,
  ReviewTone,
  Pronouns,
  TimePeriod,
  WorkAttributeType,
  Relationship,
  WorkAttribute,
} from "./common";

export class PromptBuilder {
  build(details: PersonDetails): string {
    const relationship = this.createPromptForRelationship(
      details.relationship,
      details.name
    );
    const role = this.createPromptForRole(details.relationship, details.role);
    const department = this.createPromptForDepartment(
      details.relationship,
      details.department
    );
    const performanceScore = this.createPromptForPerformace(
      details.relationship,
      details.pronoun,
      details.performanceScore
    );
    const timePeriod = this.createPromptForTimePeriod(details.timePeriod);
    const pronoun = this.createPromptForPronoun(
      details.relationship,
      details.pronoun
    );
    const tone = this.createPromptForTone(
      details.reviewTone || ReviewTone.NEUTRAL
    );
    const language = this.createPromptForLanguage(
      details.reviewLanguage || ReviewLanguage.ENGLISH
    );
    const attributes = this.createPromptForAttributes(details.attributes);

    return [
      ...relationship,
      ...role,
      ...department,
      ...performanceScore,
      ...timePeriod,
      ...pronoun,
      ...tone,
      ...language,
      ...attributes,
    ].join(" ");
  }

  private createPromptForRelationship(
    relationship: Relationship,
    name: string
  ): string[] {
    switch (relationship) {
      case Relationship.MYSELF:
        return ["Write a performance review for myself."];
      case Relationship.COLLEAGUE:
        return [`Write a performance review for a colleague named ${name}.`];
      case Relationship.MANAGER:
        return [`Write a performance review for my manager, named ${name}.`];
      case Relationship.REPORT:
        return [
          `Write a performance review for my direct report, named ${name}.`,
        ];
    }
  }

  private createPromptForRole(
    relationship: Relationship,
    role?: string
  ): string[] {
    if (!role) {
      return [];
    }
    if (relationship === Relationship.MYSELF) {
      return [`I have the role of ${role}.`];
    } else {
      return [`They have the role of ${role}.`];
    }
  }

  private createPromptForDepartment(
    relationship: Relationship,
    department?: string
  ): string[] {
    if (!department) {
      return [];
    }
    if (relationship === Relationship.MYSELF) {
      return [`I am working in the ${department} team.`];
    } else {
      return [`They are working in the ${department} team.`];
    }
  }

  private createPromptForPerformace(
    relationship: Relationship,
    pronoun: Pronouns,
    performanceScore: PerformanceScore
  ): string[] {
    let startingPoint = "";
    if (relationship === Relationship.MYSELF) {
      startingPoint = "I am";
    } else {
      switch (pronoun) {
        case Pronouns.NEUTRAL: {
          startingPoint = "They are";
          break;
        }
        case Pronouns.HE: {
          startingPoint = "He is";
          break;
        }
        case Pronouns.HER: {
          startingPoint = "She is";
          break;
        }
      }
    }

    switch (performanceScore) {
      case PerformanceScore.BELOW_EXPECTATIONS:
        return [`${startingPoint} performing below expectations.`];
      case PerformanceScore.MEETS_EXPECTATIONS:
        return [`${startingPoint} are meeting expectations.`];
      case PerformanceScore.ABOVE_EXPECTATIONS:
        return [`${startingPoint} are performing above expectations.`];
    }
  }

  private createPromptForTimePeriod(timePeriod?: TimePeriod): string[] {
    if (!timePeriod) {
      return [];
    }

    switch (timePeriod) {
      case TimePeriod.LAST_MONTH:
        return [`The review is for the last month.`];
      case TimePeriod.LAST_3_MONTHS:
        return [`The review is for the last 3 months.`];
      case TimePeriod.LAST_6_MONTHS:
        return [`The review is for the last 6 months.`];
      case TimePeriod.LAST_12_MONTHS:
        return [`The review is for the last 12 months.`];
    }
  }

  private createPromptForPronoun(
    relationship: Relationship,
    pronoun: Pronouns
  ): string[] {
    if (relationship === Relationship.MYSELF) {
      return ["Refer to me in the first person."];
    }

    switch (pronoun) {
      case Pronouns.NEUTRAL:
        return [`Use the pronoun 'they'.`];
      case Pronouns.HE:
        return [`Use the pronoun 'he'.`];
      case Pronouns.HER:
        return [`Use the pronoun 'her'.`];
    }
  }

  private createPromptForTone(tone: ReviewTone): string[] {
    switch (tone) {
      case ReviewTone.NEUTRAL:
        return ["Use a neutral tone."];
      case ReviewTone.FRIENDLY:
        return ["Use a friendly tone."];
      case ReviewTone.CRITICAL:
        return ["Use a critical tone."];
    }
  }

  private createPromptForLanguage(language: ReviewLanguage): string[] {
    switch (language) {
      case ReviewLanguage.ENGLISH:
        return ["Write the review in English."];
      case ReviewLanguage.SPANISH:
        return ["Write the review in Spanish."];
      case ReviewLanguage.FRENCH:
        return ["Write the review in French."];
      case ReviewLanguage.GERMAN:
        return ["Write the review in German."];
      case ReviewLanguage.ITALIAN:
        return ["Write the review in Italian."];
      case ReviewLanguage.ROMANIAN:
        return ["Write the review in Romanian."];
    }
  }

  private createPromptForAttributes(
    relationship: Relationship,
    attributes: WorkAttribute[]
  ): string[] {
    let pronoun = "";
    if (relationship === Relationship.MYSELF) {
      pronoun = "I";
    } else {
      pronoun = "they";
    }
    return attributes.map((attribute: WorkAttribute) => {
      switch (attribute.type) {
        case WorkAttributeType.GOAL:
          return `Write a short paragraph about ${attribute.name} as a goal ${pronoun} have set for the next review cycle.`;
        case WorkAttributeType.GROWTH:
          return `Write a short paragraph about ${attribute.name} as an area where ${pronoun} have grown in this review cycle.`;
        case WorkAttributeType.IMPROVE:
          return `Write a short paragraph about ${attribute.name} as an area where ${pronoun} need to improve.`;
        case WorkAttributeType.PROJECT:
          return `Write a short paragraph about ${attribute.name} as a project ${pronoun} have worked on.`;
        case WorkAttributeType.SKILL:
          return `Write a short paragraph about ${attribute.name} as a skill ${pronoun} are good at.`;
        case WorkAttributeType.STRENGTH:
          return `Write a short paragraph about ${attribute.name} as a strength ${pronoun} have.`;
        default:
          return "";
      }
    });
  }
}
