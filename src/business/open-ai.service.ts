import {
  CoverLetterHintBuilder,
  ExpandPromptBuilder,
  PerformanceReviewPromptBuilder,
  PerformanceReviewHintBuilder,
  CoverLetterPromptBuilder,
  ReferralLetterHintBuilder,
  ReferralLetterPromptBuilder,
  ResumeSummaryPromptBuilder,
  ResumeWorkHistoryPromptBuilder,
} from "./prompt-builder";
import {
  CoverLetterInput,
  PerformanceReviewInput,
  PerformanceScore,
  ReferralLetterInput,
  ResumeInput,
  ReviewTone,
} from "./common";
import { Configuration, OpenAIApi } from "openai";
import fetchAdapter from "@haverstack/axios-fetch-adapter";
import { runInThisContext } from "vm";
import { isValidWorkHistory } from "../state/resume.state";

type NetworkInput = {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
};

type NetworkResponse = {
  status: number;
  data: {
    choices: {
      text: string;
    }[];
  };
};

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

    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.25,
      max_tokens,
      prompt,
    });

    return response
      .replaceAll("\n", "")
      .split("\n")
      .flatMap((e) => e.split("."))
      .filter((e) => e !== "")
      .filter((e) => e !== "\n")
      .map((e) => e.trim());
  }

  async generateCoverLetter(input: CoverLetterInput): Promise<string[]> {
    const builder = new CoverLetterPromptBuilder();
    const prompt = builder.build(input);
    const max_tokens = prompt.length + 2000;

    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.25,
      max_tokens,
      prompt,
    });

    return response
      .replaceAll("\n", "")
      .split("\n")
      .flatMap((e) => e.split("."))
      .filter((e) => e !== "")
      .filter((e) => e !== "\n")
      .map((e) => e.trim());
  }

  async generateReferralLetter(input: ReferralLetterInput): Promise<string[]> {
    const builder = new ReferralLetterPromptBuilder();
    const prompt = builder.build(input);
    const max_tokens = prompt.length + 2000;

    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.25,
      max_tokens,
      prompt,
    });

    const aiResult = response
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
  }

  async generateResume(input: ResumeInput): Promise<string[]> {
    const detailsResults = [
      `Name: ${input.details.name}`,
      `Address: ${input.details.address}`,
      `Phone: ${input.details.phone}`,
      `Email: ${input.details.email}`,
    ].join("\n");

    let summaryResults = "";
    if (!input.summary.summary) {
      summaryResults = "Please make sure to provide some summary information.";
    } else {
      const prompt = new ResumeSummaryPromptBuilder().build(input);
      const max_tokens = prompt.length + 2000;
      const response = await this.getResponse({
        model: this.MODEL,
        temperature: 0.25,
        max_tokens,
        prompt,
      });
      summaryResults = response.trim();
    }

    let workplaceResult = [""];
    const validItems = input.workplaces.items.filter((e) =>
      isValidWorkHistory(e)
    );
    if (validItems.length === 0) {
      workplaceResult = [
        "Please make sure to provide some information about your previous and current roles.",
      ];
    } else {
      for (const workplace of input.workplaces.items) {
        const prompt = new ResumeWorkHistoryPromptBuilder().build(
          input.workplaces.question,
          workplace
        );
        const max_tokens = prompt.length + 350;
        const response = await this.getResponse({
          model: this.MODEL,
          temperature: 0.15,
          max_tokens,
          prompt,
        });
        const result = [
          `Company: ${workplace.company}`,
          `Role: ${workplace.role} (${workplace.start} - ${workplace.end})`,
          ``,
          response.trim(),
        ]
          .join("\n")
          .trim();
        workplaceResult.push(result);
      }
    }

    const result = [detailsResults, summaryResults, ...workplaceResult].filter(
      (e) => !!e
    );
    return result;
  }

  async expandText(text: string): Promise<string> {
    const builder = new ExpandPromptBuilder();
    const prompt = builder.build(text);
    const max_tokens = prompt.length + 1000;

    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.15,
      max_tokens,
      prompt,
    });
    return response.trim();
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

    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.15,
      max_tokens,
      prompt,
    });
    return response.trim();
  }

  async generateCoverLetterHint(role: string): Promise<string> {
    const prompt = new CoverLetterHintBuilder().build(role);
    const max_tokens = prompt.length + 1000;
    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.15,
      max_tokens,
      prompt,
    });
    return response.trim();
  }

  async generateReferralLetterHint(role: string): Promise<string> {
    const prompt = new ReferralLetterHintBuilder().build(role);
    const max_tokens = prompt.length + 1000;
    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.15,
      max_tokens,
      prompt,
    });
    return response.trim();
  }

  private async getResponse(input: NetworkInput): Promise<string> {
    try {
      const response = (await this.api.createCompletion(
        input
      )) as NetworkResponse;

      if (response.status !== 200) {
        throw new Error(OpenAIErrorMessage.BadStatus);
      } else if (response.data.choices.length === 0) {
        throw new Error(OpenAIErrorMessage.NoContent);
      } else if (response.data.choices[0].text === undefined) {
        throw new Error(OpenAIErrorMessage.MissingText);
      }

      return response.data.choices[0].text ?? "";
    } catch (e) {
      throw new Error(OpenAIErrorMessage.Network);
    }
  }
}
