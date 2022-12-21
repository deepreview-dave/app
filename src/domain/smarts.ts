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

  async getSomeData(details: ReviewedDetails): Promise<string | undefined> {
    try {
      const response = await this.api.createCompletion({
        model: "text-davinci-003",
        prompt: this.buildPrompt(details),
        temperature: 0,
        max_tokens: 100,
      });
      return response.data.choices[0].text;
    } catch (e) {
      console.log(`Something bad happened --> ${e}`);
      return undefined;
    }
  }

  private buildPrompt(details: ReviewedDetails): string {
    switch (details.performanceScore) {
      case PerformanceScore.BELOW_EXPECTATIONS:
        return `Write a performance review for ${details.name} who is below expectations`;
      case PerformanceScore.MEETS_EXPECTATIONS:
        return `Write a performance review for ${details.name} who meets expectations`;
      case PerformanceScore.ABOVE_EXPECTATIONS:
        return `Write a performance review for ${details.name} who is above expectations`;
    }
  }
}
