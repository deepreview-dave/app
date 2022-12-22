import { PerformanceScore, PersonDetails, WorkAttribute } from './common';

export class PromptBuilder {

  build(details: PersonDetails, attributes: WorkAttribute[]): string {
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

    return prompt;
  }
}