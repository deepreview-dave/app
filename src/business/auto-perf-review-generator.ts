import fetchAdapter from "@haverstack/axios-fetch-adapter";
import { Configuration, OpenAIApi } from "openai";

import { PersonDetails } from "./common";
import { PromptBuilder } from "./prompt-builder";

export interface PersonPerfReviewResult {
  perfReview: string;
}

export class AutoPerfReviewGenerator {
  apiKey: string;
  builder: PromptBuilder;
  api: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
      baseOptions: { adapter: fetchAdapter },
    });

    this.apiKey = apiKey;
    this.api = new OpenAIApi(configuration);
    this.builder = new PromptBuilder();
  }

  async getSomeData(details: PersonDetails): Promise<PersonPerfReviewResult> {
    let response = null;
    try {
      response = await this.api.createCompletion({
        model: "text-davinci-003",
        prompt: this.builder.build(details),
        temperature: 0.5,
        max_tokens: 1000,
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
}
