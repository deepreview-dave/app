import {
  PerformanceScore,
  PersonDetails,
  ReviewLanguage,
  ReviewTone,
  Pronouns,
  TimePeriod,
  WorkAttributeType,
} from "./common";

export class PromptBuilder {
  build(details: PersonDetails): string {
    const promptArray: string[] = [];

    promptArray.push(
      `Write a performance review for a person named ${details.name}.`
    );

    if (details.role) {
      promptArray.push(`They have the role of ${details.role}.`);
    }

    if (details.department) {
      promptArray.push(`They are in the ${details.department} team.`);
    }

    switch (details.performanceScore) {
      case PerformanceScore.BELOW_EXPECTATIONS: {
        promptArray.push(`They are performing below expectations.`);
        break;
      }
      case PerformanceScore.MEETS_EXPECTATIONS: {
        promptArray.push(`They are meeting expectations.`);
        break;
      }
      case PerformanceScore.ABOVE_EXPECTATIONS: {
        promptArray.push(`They are performing above expectations.`);
        break;
      }
    }

    if (details.timePeriod) {
      switch (details.timePeriod) {
        case TimePeriod.LAST_MONTH: {
          promptArray.push(`The review is for the last month.`);
          break;
        }
        case TimePeriod.LAST_3_MONTHS: {
          promptArray.push(`The review is for the last 3 months.`);
          break;
        }
        case TimePeriod.LAST_6_MONTHS: {
          promptArray.push(`The review is for the last 6 months.`);
          break;
        }
        case TimePeriod.LAST_12_MONTHS: {
          promptArray.push(`The review is for the last 12 months.`);
          break;
        }
      }
    }

    switch (details.pronoun) {
      case Pronouns.NEUTRAL: {
        promptArray.push(`Use the pronoun 'they'.`);
        break;
      }
      case Pronouns.HE: {
        promptArray.push(`Use the pronoun 'he'.`);
        break;
      }
      case Pronouns.HER: {
        promptArray.push(`Use the pronoun 'her'.`);
        break;
      }
    }

    const reviewTone = details.reviewTone || ReviewTone.NEUTRAL;

    switch (reviewTone) {
      case ReviewTone.NEUTRAL: {
        promptArray.push("Use a neutral tone.");
        break;
      }
      case ReviewTone.FRIENDLY: {
        promptArray.push("Use a friendly tone.");
        break;
      }
      case ReviewTone.CRITICAL: {
        promptArray.push("Use a critical tone.");
        break;
      }
    }

    const reviewLanguage = details.reviewLanguage || ReviewLanguage.ENGLISH;

    switch (reviewLanguage) {
      case ReviewLanguage.ENGLISH: {
        promptArray.push("Write the review in English.");
        break;
      }
      case ReviewLanguage.SPANISH: {
        promptArray.push("Write the review in Spanish.");
        break;
      }
      case ReviewLanguage.FRENCH: {
        promptArray.push("Write the review in French.");
        break;
      }
      case ReviewLanguage.GERMAN: {
        promptArray.push("Write the review in German.");
        break;
      }
      case ReviewLanguage.ITALIAN: {
        promptArray.push("Write the review in Italian.");
        break;
      }
      case ReviewLanguage.ROMANIAN: {
        promptArray.push("Write the review in Romanian.");
        break;
      }
    }

    for (const attribute of details.attributes) {
      switch (attribute.type) {
        case WorkAttributeType.GOAL: {
          promptArray.push(
            `Write a short paragraph about ${attribute.name} as a goal they have set for the next review cycle.`
          );
          break;
        }
        case WorkAttributeType.GROWTH: {
          promptArray.push(
            `Write a short paragraph about ${attribute.name} as an area where they have grown in this review cycle.`
          );
          break;
        }
        case WorkAttributeType.IMPROVE: {
          promptArray.push(
            `Write a short paragraph about ${attribute.name} as an area where they need to improve.`
          );
          break;
        }
        case WorkAttributeType.PROJECT: {
          promptArray.push(
            `Write a short paragraph about ${attribute.name} as a project they have worked on.`
          );
          break;
        }
        case WorkAttributeType.SKILL: {
          promptArray.push(
            `Write a short paragraph about ${attribute.name} as a skill they are good at.`
          );
          break;
        }
        case WorkAttributeType.STRENGTH: {
          promptArray.push(
            `Write a short paragraph about ${attribute.name} as a strength they have.`
          );
          break;
        }
      }
    }

    if (details.attributes.length > 0) {
      promptArray.push("Aim to be verbose, but do not exceed 2000 tokens");
    } else {
      promptArray.push("Aim to be verbose, but do not exceed 1000 tokens");
    }

    return promptArray.join(" ");
  }
}
