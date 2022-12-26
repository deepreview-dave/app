import fetchAdapter from "@haverstack/axios-fetch-adapter";
import { Configuration, OpenAIApi } from "openai";

import { PersonDetails } from "./common";
import { PromptBuilder } from "./prompt-builder";

export interface PersonPerfReviewResult {
  perfReview: string[];
}

const OPENAI_MODEL_PARAMS = {
  model: "text-davinci-003",
  temperature: 0.5,
  max_tokens: 2000,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
  best_of: 1,
};

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
    this.builder = new PromptBuilder();
    this.api = new OpenAIApi(configuration);
  }

  async getSomeData(details: PersonDetails): Promise<PersonPerfReviewResult> {
    let response = null;
    try {
      response = await this.api.createCompletion({
        ...OPENAI_MODEL_PARAMS,
        prompt: this.builder.build(details),
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

    return { perfReview: this.compileAnswer(response.data.choices[0].text) };
  }

  private compileAnswer(rawGptString: string): string[] {
    return rawGptString.trim().split("\n\n");
  }
}
