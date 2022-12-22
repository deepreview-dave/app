import fetchAdapter from "@haverstack/axios-fetch-adapter";
const { Configuration, OpenAIApi } = require("openai");

import { PersonDetails, WorkAttribute } from "./common";
import { PromptBuilder } from "./prompt-builder";

export interface PersonPerfReviewResult {
  perfReview: string;
}

export class AutoPerfReviewGenerator {
  apiKey: string;
  api: typeof OpenAIApi;
  builder: PromptBuilder

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
      baseOptions: { adapter: fetchAdapter },
    });

    this.apiKey = apiKey;
    this.api = new OpenAIApi(configuration);
    this.builder = new PromptBuilder();
  }

  async getSomeData(details: PersonDetails, attributes: WorkAttribute[]): Promise<PersonPerfReviewResult> {
    try {
      const response = await this.api.createCompletion({
        model: "text-davinci-003",
        prompt: this.builder.build(details, attributes),
        temperature: 0,
        max_tokens: 100,
      });

      if (response.status !== 200) {
        throw new Error(
          `OpenAI error: ${response.status} ${response.statusText}`
        );
      }

      return { perfReview: response.data.choices[0].text };
    } catch (e) {
      console.log(`Something bad happened: ${e}`);
      throw e;
    }
  }
}
