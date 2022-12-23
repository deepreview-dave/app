import { PerformanceScore, PersonDetails, WorkAttributeType } from "./common";

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
        case WorkAttributeType.TRAIT: {
          prompt += `Mention ${attribute.name} as a good trait they have.`;
          break;
        }
      }
    }

    return prompt;
  }
}
