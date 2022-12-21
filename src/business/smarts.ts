import fetchAdapter from "@haverstack/axios-fetch-adapter";

const { Configuration, OpenAIApi } = require("openai");

export enum PerformanceScore {
  BELOW_EXPECTATIONS = "below-expectations",
  MEETS_EXPECTATIONS = "meets-expectations",
  ABOVE_EXPECTATIONS = "above-expectations",
}

export interface ReviewedDetails {
  name: string;
  performanceScore: PerformanceScore;
  role?: string;
  department?: string;
}

export interface ReviewResult {
  success: boolean;
  answer?: string;
  error?: string;
}

export class TextSmarts {
  apiKey: string;
  api: typeof OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
      baseOptions: { adapter: fetchAdapter },
    });

    this.apiKey = apiKey;
    this.api = new OpenAIApi(configuration);
  }

  async getSomeData(details: ReviewedDetails): Promise<ReviewResult> {
    try {
      const response = await this.api.createCompletion({
        model: "text-davinci-003",
        prompt: this.buildPrompt(details),
        temperature: 0,
        max_tokens: 100,
      });
      return { success: true, answer: response.data.choices[0].text };
    } catch (e) {
      console.log(`Something bad happened --> ${e}`);
      return { success: false, error: `${e}` };
    }
  }

  private buildPrompt(details: ReviewedDetails): string {
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
