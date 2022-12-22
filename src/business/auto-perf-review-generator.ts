import fetchAdapter from "@haverstack/axios-fetch-adapter";
import { Configuration, OpenAIApi } from "openai";

import { PerformanceScore } from "./common";

export interface PersonDetails {
  name: string;
  performanceScore: PerformanceScore;
  role?: string;
  department?: string;
}

export interface PersonPerfReviewResult {
  perfReview: string;
}

export class AutoPerfReviewGenerator {
  apiKey: string;
  api: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
      baseOptions: { adapter: fetchAdapter },
    });

    this.apiKey = apiKey;
    this.api = new OpenAIApi(configuration);
  }

  async getSomeData(details: PersonDetails): Promise<PersonPerfReviewResult> {
    let response = null;
    try {
      response = await this.api.createCompletion({
        model: "text-davinci-003",
        prompt: this.buildPrompt(details),
        temperature: 0,
        max_tokens: 100,
      });
    } catch (e) {
      console.log(`Something bad happened: ${e}`);
      throw e;
    }

    if (response.status !== 200) {
      throw new Error(
        `OpenAI error: ${response.status} ${response.statusText}`
      );
    } else if (response.data.choices.length === 0) {
      throw new Error(`OpenAI error: no content`);
    } else if (response.data.choices[0].text === undefined) {
      throw new Error("OpenAI error: missing text in content");
    }

    return { perfReview: response.data.choices[0].text };
  }

  private buildPrompt(details: PersonDetails): string {
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
