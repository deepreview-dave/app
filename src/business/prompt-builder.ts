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
  PerformanceReviewInput,
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
      details.pronoun,
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
    const attributes = this.createPromptForAttributes(
      details.relationship,
      details.attributes
    );

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
    pronoun: Pronouns,
    department?: string
  ): string[] {
    if (!department) {
      return [];
    }
    const startingPoint = this.createSimplePronoun(relationship, pronoun);
    return [`${startingPoint} working in the ${department} team.`];
  }

  private createPromptForPerformace(
    relationship: Relationship,
    pronoun: Pronouns,
    performanceScore: PerformanceScore
  ): string[] {
    const startingPoint = this.createSimplePronoun(relationship, pronoun);
    switch (performanceScore) {
      case PerformanceScore.BELOW_EXPECTATIONS:
        return [`${startingPoint} performing below expectations.`];
      case PerformanceScore.MEETS_EXPECTATIONS:
        return [`${startingPoint} meeting expectations.`];
      case PerformanceScore.ABOVE_EXPECTATIONS:
        return [`${startingPoint} performing above expectations.`];
    }
  }

  private createSimplePronoun(
    relationship: Relationship,
    pronoun: Pronouns
  ): string {
    let result = "";
    if (relationship === Relationship.MYSELF) {
      result = "I am";
    } else {
      switch (pronoun) {
        case Pronouns.NEUTRAL: {
          result = "They are";
          break;
        }
        case Pronouns.HE: {
          result = "He is";
          break;
        }
        case Pronouns.HER: {
          result = "She is";
          break;
        }
      }
    }

    return result;
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
          return `Write a short paragraph about ${attribute.name} as a goal ${pronoun} have set for the next review cycle. Add the following details ${attribute.details}.`;
        case WorkAttributeType.GROWTH:
          return `Write a short paragraph about ${attribute.name} as an area where ${pronoun} have grown in this review cycle. Add the following details ${attribute.details}.`;
        case WorkAttributeType.IMPROVE:
          return `Write a short paragraph about ${attribute.name} as an area where ${pronoun} need to improve. Add the following details ${attribute.details}.`;
        case WorkAttributeType.PROJECT:
          return `Write a short paragraph about ${attribute.name} as a project ${pronoun} have worked on. Add the following details ${attribute.details}.`;
        case WorkAttributeType.SKILL:
          return `Write a short paragraph about ${attribute.name} as a skill ${pronoun} are good at. Add the following details ${attribute.details}.`;
        case WorkAttributeType.STRENGTH:
          return `Write a short paragraph about ${attribute.name} as a strength ${pronoun} have. Add the following details ${attribute.details}.`;
        default:
          return "";
      }
    });
  }
}

export class FlexiblePromptBuilder {
  build(details: PerformanceReviewInput): string {
    const prompt: string[] = [];

    prompt.push(details.question);
    if (details.details) {
      prompt.push(details.details);
    }
    prompt.push(`Please also add the following personal details`);
    if (details.name) {
      prompt.push(`Person Name: ${details.name}`);
      switch (details.pron) {
        case Pronouns.NEUTRAL: {
          prompt.push(`Use the pronoun 'they'`);
          break;
        }
        case Pronouns.HE: {
          prompt.push(`Use the pronoun 'he'`);
          break;
        }
        case Pronouns.HER: {
          prompt.push(`Use the pronoun 'she'`);
          break;
        }
      }
    } else {
      prompt.push(`Person: Myself`);
      prompt.push(`Refer to me in the first person`);
    }
    if (details.role) {
      prompt.push(`Role: ${details.role}`);
    }
    if (details.team) {
      prompt.push(`Team: ${details.team}`);
    }
    switch (details.perf) {
      case PerformanceScore.ABOVE_EXPECTATIONS: {
        prompt.push(`Performance: above expectations`);
        break;
      }
      case PerformanceScore.MEETS_EXPECTATIONS: {
        prompt.push(`Performance: meets expectations`);
        break;
      }
      case PerformanceScore.BELOW_EXPECTATIONS: {
        prompt.push(`Performance: below expectations`);
        break;
      }
    }
    switch (details.time) {
      case TimePeriod.LAST_MONTH: {
        prompt.push(`Time period: previous month`);
        break;
      }
      case TimePeriod.LAST_3_MONTHS: {
        prompt.push(`Time period: previous quarter`);
        break;
      }
      case TimePeriod.LAST_6_MONTHS: {
        prompt.push(`Time period: previous half year`);
        break;
      }
      case TimePeriod.LAST_12_MONTHS: {
        prompt.push(`Time period: previous year`);
        break;
      }
    }
    switch (details.tone) {
      case ReviewTone.NEUTRAL: {
        prompt.push(`Use a neutral tone`);
        break;
      }
      case ReviewTone.FRIENDLY: {
        prompt.push(`Use a friendly tone`);
        break;
      }
      case ReviewTone.CRITICAL: {
        prompt.push(`Use a critical tone`);
        break;
      }
    }

    return prompt.join("\n");
  }
}

export class InspirationPromptBuilder {
  build(
    role: string | undefined,
    performance: PerformanceScore,
    tone: ReviewTone
  ): string {
    let good = 0;
    let bad = 0;

    switch (performance) {
      case PerformanceScore.ABOVE_EXPECTATIONS: {
        good += 2;
        bad += 1;
        break;
      }
      case PerformanceScore.MEETS_EXPECTATIONS: {
        good += 1;
        bad += 1;
        break;
      }
      case PerformanceScore.BELOW_EXPECTATIONS: {
        good += 1;
        bad += 2;
        break;
      }
    }

    switch (tone) {
      case ReviewTone.FRIENDLY: {
        good += 1;
        break;
      }
      case ReviewTone.NEUTRAL: {
        good += 1;
        bad += 1;
        break;
      }
      case ReviewTone.CRITICAL: {
        bad += 1;
        break;
      }
    }

    const rolePart = "an employee";
    if (role) {
      role += `a ${role}`;
    }

    let perfPart = "";
    switch (performance) {
      case PerformanceScore.ABOVE_EXPECTATIONS: {
        perfPart = "has performed above expectations";
        break;
      }
      case PerformanceScore.MEETS_EXPECTATIONS: {
        perfPart = "meets expectations";
        break;
      }
      case PerformanceScore.BELOW_EXPECTATIONS: {
        perfPart = "has performed below expectations";
        break;
      }
    }

    return `Please list ${good} strengths and ${bad} areas of improvement for a ${rolePart} who ${perfPart}.`;
  }
}
