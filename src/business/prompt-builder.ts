import {
  PerformanceScore,
  PersonDetails,
  ReviewLanguage,
  ReviewTone,
  TimePeriod,
  WorkAttributeType,
} from "./common";

export class PromptBuilder {
  build(details: PersonDetails): string {
    let prompt = `Write a performance review for ${details.name} `;

    if (details.role) {
      prompt += `who is in the ${details.role} `;
    }

    if (details.department) {
      prompt += `in the ${details.department} department `;
    }

    switch (details.performanceScore) {
      case PerformanceScore.BELOW_EXPECTATIONS: {
        prompt += `and is performing below expectations `;
        break;
      }
      case PerformanceScore.MEETS_EXPECTATIONS: {
        prompt += `and is meeting expectations `;
        break;
      }
      case PerformanceScore.ABOVE_EXPECTATIONS: {
        prompt += `and is performing above expectations `;
        break;
      }
    }

    if (details.timePeriod) {
      switch (details.timePeriod) {
        case TimePeriod.LAST_MONTH: {
          prompt += `in the last month `;
          break;
        }
        case TimePeriod.LAST_3_MONTHS: {
          prompt += `in the last 3 months `;
          break;
        }
        case TimePeriod.LAST_6_MONTHS: {
          prompt += `in the last 6 months `;
          break;
        }
        case TimePeriod.LAST_12_MONTHS: {
          prompt += `in the last 12 months `;
          break;
        }
      }
    }

    prompt += ".";

    for (const attribute of details.attributes) {
      switch (attribute.type) {
        case WorkAttributeType.GOAL: {
          prompt += `Mention ${attribute.name} as a goal they have set for the next review cycle.`;
          break;
        }
        case WorkAttributeType.GROWTH: {
          prompt += `Mention ${attribute.name} as an area where they have grown in this review cycle.`;
          break;
        }
        case WorkAttributeType.IMPROVE: {
          prompt += `Mention ${attribute.name} as an area where they need to improve.`;
          break;
        }
        case WorkAttributeType.PROJECT: {
          prompt += `Mention ${attribute.name} as a project they have worked on.`;
          break;
        }
        case WorkAttributeType.SKILL: {
          prompt += `Mention ${attribute.name} as a skill they are good at.`;
          break;
        }
        case WorkAttributeType.STRENGTH: {
          prompt += `Mention ${attribute.name} as a strength they have.`;
          break;
        }
      }
    }

    const reviewTone = details.reviewTone || ReviewTone.NEUTRAL;

    switch (reviewTone) {
      case ReviewTone.NEUTRAL: {
        prompt += " Use a neutral tone.";
        break;
      }
      case ReviewTone.FRIENDLY: {
        prompt += " Use a friendly tone.";
        break;
      }
      case ReviewTone.CRITICAL: {
        prompt += " Use a critical tone.";
        break;
      }
    }

    const reviewLanguage = details.reviewLanguage || ReviewLanguage.ENGLISH;

    switch (reviewLanguage) {
      case ReviewLanguage.ENGLISH: {
        prompt += " Write the review in English.";
        break;
      }
      case ReviewLanguage.SPANISH: {
        prompt += " Write the review in Spanish.";
        break;
      }
      case ReviewLanguage.FRENCH: {
        prompt += " Write the review in French.";
        break;
      }
      case ReviewLanguage.GERMAN: {
        prompt += " Write the review in German.";
        break;
      }
      case ReviewLanguage.ITALIAN: {
        prompt += " Write the review in Italian.";
        break;
      }
      case ReviewLanguage.ROMANIAN: {
        prompt += " Write the review in Romanian.";
        break;
      }
    }

    return prompt;
  }
}
