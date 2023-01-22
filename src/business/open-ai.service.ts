import {
  CoverLetterHintBuilder,
  ExpandPromptBuilder,
  PerformanceReviewPromptBuilder,
  PerformanceReviewHintBuilder,
  CoverLetterPromptBuilder,
  ReferralLetterHintBuilder,
  ReferralLetterPromptBuilder,
} from "./prompt-builder";
import {
  CoverLetterInput,
  PerformanceReviewInput,
  PerformanceScore,
  ReferralLetterInput,
  ReviewTone,
} from "./common";
import { Configuration, OpenAIApi } from "openai";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

export enum OpenAIErrorMessage {
  Network = "An network error occured. Please try again.",
  BadStatus = "An unknown error occured. Please try again.",
  NoContent = "No content was returned. Please try again.",
  MissingText = "No content was returned. Please try again.",
}

export class OpenAIService {
  private MODEL = "text-davinci-003";
  private apiKey: string | undefined;
  private api: OpenAIApi;

  constructor() {
    this.apiKey = process.env.REACT_APP_OPEN_AI_KEY;

    const configuration = new Configuration({
      apiKey: this.apiKey,
      baseOptions: { adapter: fetchAdapter },
    });

    this.api = new OpenAIApi(configuration);
  }

  async generatePerformanceReview(
    input: PerformanceReviewInput
  ): Promise<string[]> {
    const builder = new PerformanceReviewPromptBuilder();
    const prompt = builder.build(input);
    const max_tokens = prompt.length + 2000;

    try {
      const response = await this.api.createCompletion({
        model: this.MODEL,
        temperature: 0.25,
        max_tokens,
        prompt,
      });

      if (response.status !== 200) {
        throw new Error(OpenAIErrorMessage.BadStatus);
      } else if (response.data.choices.length === 0) {
        throw new Error(OpenAIErrorMessage.NoContent);
      } else if (response.data.choices[0].text === undefined) {
        throw new Error(OpenAIErrorMessage.MissingText);
      }

      const rawResult = response.data.choices[0].text ?? "";

      return rawResult
        .replaceAll("\n", "")
        .split("\n")
        .flatMap((e) => e.split("."))
        .filter((e) => e !== "")
        .filter((e) => e !== "\n")
        .map((e) => e.trim());
    } catch (e) {
      throw new Error(OpenAIErrorMessage.Network);
    }
  }

  async generateCoverLetter(input: CoverLetterInput): Promise<string[]> {
    const builder = new CoverLetterPromptBuilder();
    const prompt = builder.build(input);
    const max_tokens = prompt.length + 2000;
    try {
      const response = await this.api.createCompletion({
        model: this.MODEL,
        temperature: 0.25,
        max_tokens,
        prompt,
      });

      if (response.status !== 200) {
        throw new Error(OpenAIErrorMessage.BadStatus);
      } else if (response.data.choices.length === 0) {
        throw new Error(OpenAIErrorMessage.NoContent);
      } else if (response.data.choices[0].text === undefined) {
        throw new Error(OpenAIErrorMessage.MissingText);
      }

      const rawResult = response.data.choices[0].text ?? "";

      return rawResult
        .replaceAll("\n", "")
        .split("\n")
        .flatMap((e) => e.split("."))
        .filter((e) => e !== "")
        .filter((e) => e !== "\n")
        .map((e) => e.trim());
    } catch (e) {
      throw new Error(OpenAIErrorMessage.Network);
    }
  }

  async generateReferralLetter(input: ReferralLetterInput): Promise<string[]> {
    const builder = new ReferralLetterPromptBuilder();
    const prompt = builder.build(input);
    const max_tokens = prompt.length + 2000;
    try {
      const response = await this.api.createCompletion({
        model: this.MODEL,
        temperature: 0.25,
        max_tokens,
        prompt,
      });

      if (response.status !== 200) {
        throw new Error(OpenAIErrorMessage.BadStatus);
      } else if (response.data.choices.length === 0) {
        throw new Error(OpenAIErrorMessage.NoContent);
      } else if (response.data.choices[0].text === undefined) {
        throw new Error(OpenAIErrorMessage.MissingText);
      }

      const rawResult = response.data.choices[0].text ?? "";

      const aiResult = rawResult
        .replaceAll("\n", "")
        .split("\n")
        .flatMap((e) => e.split("."))
        .filter((e) => e !== "")
        .filter((e) => e !== "\n")
        .map((e) => e.trim());

      const bakedResults = [
        `${input.you.name}`,
        `${input.you.address}`,
        `${input.you.contact}`,
        ``,
        `${new Date().toDateString()}`,
        ``,
        `${input.recipient.name}`,
        `${input.recipient.title}`,
        `${input.recipient.company}`,
        `${input.recipient.address}`,
      ].join("\n");

      return [bakedResults, ...aiResult];
    } catch (e) {
      throw new Error(OpenAIErrorMessage.Network);
    }
  }

  async expandText(text: string): Promise<string> {
    const builder = new ExpandPromptBuilder();
    const prompt = builder.build(text);
    const max_tokens = prompt.length + 1000;

    try {
      const response = await this.api.createCompletion({
        model: this.MODEL,
        temperature: 0.15,
        max_tokens,
        prompt,
      });

      if (response.status !== 200) {
        throw new Error(OpenAIErrorMessage.BadStatus);
      } else if (response.data.choices.length === 0) {
        throw new Error(OpenAIErrorMessage.NoContent);
      } else if (response.data.choices[0].text === undefined) {
        throw new Error(OpenAIErrorMessage.MissingText);
      }

      const rawResult = response.data.choices[0].text ?? "";
      return rawResult.trim();
    } catch (e) {
      throw new Error(OpenAIErrorMessage.Network);
    }
  }

  async generatePerformanceReviewHint(
    role: string | undefined,
    performance: PerformanceScore,
    tone: ReviewTone
  ): Promise<string> {
    const prompt = new PerformanceReviewHintBuilder().build(
      role,
      performance,
      tone
    );
    const max_tokens = prompt.length + 1000;

    try {
      const response = await this.api.createCompletion({
        model: this.MODEL,
        temperature: 0.15,
        max_tokens,
        prompt,
      });

      if (response.status !== 200) {
        throw new Error(OpenAIErrorMessage.BadStatus);
      } else if (response.data.choices.length === 0) {
        throw new Error(OpenAIErrorMessage.NoContent);
      } else if (response.data.choices[0].text === undefined) {
        throw new Error(OpenAIErrorMessage.MissingText);
      }

      const rawResult = response.data.choices[0].text ?? "";
      return rawResult.trim();
    } catch (e) {
      throw new Error(OpenAIErrorMessage.Network);
    }
  }

  async generateCoverLetterHint(role: string): Promise<string> {
    const prompt = new CoverLetterHintBuilder().build(role);
    const max_tokens = prompt.length + 1000;
    try {
      const response = await this.api.createCompletion({
        model: this.MODEL,
        temperature: 0.15,
        max_tokens,
        prompt,
      });

      if (response.status !== 200) {
        throw new Error(OpenAIErrorMessage.BadStatus);
      } else if (response.data.choices.length === 0) {
        throw new Error(OpenAIErrorMessage.NoContent);
      } else if (response.data.choices[0].text === undefined) {
        throw new Error(OpenAIErrorMessage.MissingText);
      }

      const rawResult = response.data.choices[0].text ?? "";
      return rawResult.trim();
    } catch (e) {
      throw new Error(OpenAIErrorMessage.Network);
    }
  }

  async generateReferralLetterHint(role: string): Promise<string> {
    const prompt = new ReferralLetterHintBuilder().build(role);
    const max_tokens = prompt.length + 1000;
    try {
      const response = await this.api.createCompletion({
        model: this.MODEL,
        temperature: 0.15,
        max_tokens,
        prompt,
      });

      if (response.status !== 200) {
        throw new Error(OpenAIErrorMessage.BadStatus);
      } else if (response.data.choices.length === 0) {
        throw new Error(OpenAIErrorMessage.NoContent);
      } else if (response.data.choices[0].text === undefined) {
        throw new Error(OpenAIErrorMessage.MissingText);
      }

      const rawResult = response.data.choices[0].text ?? "";
      return rawResult.trim();
    } catch (e) {
      throw new Error(OpenAIErrorMessage.Network);
    }
  }
}
