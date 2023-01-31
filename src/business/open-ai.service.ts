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
  ResumeEducationHistoryPromptBuilder,
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
import {
  isValidEducationHistory,
  isValidWorkHistory,
} from "../state/resume.state";

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
      .split(".")
      .map((e) => e.trim())
      .filter((e) => !!e);
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
      .split(".")
      .map((e) => e.trim())
      .filter((e) => !!e);
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
      .split(".")
      .map((e) => e.trim())
      .filter((e) => !!e);

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

  async generateResumeDetails(input: ResumeInput): Promise<string[]> {
    const details = [
      `Name: ${input.details.name}`,
      `Address: ${input.details.address}`,
      `Phone: ${input.details.phone}`,
      `Email: ${input.details.email}`,
    ].join("\n");

    return [details];
  }

  async generateResumeSummary(input: ResumeInput): Promise<string[]> {
    let summary = "";
    if (!input.summary.summary) {
      summary = "Please make sure to provide some summary information.";
    } else {
      const prompt = new ResumeSummaryPromptBuilder().build(input);
      const max_tokens = prompt.length + 2000;
      const response = await this.getResponse({
        model: this.MODEL,
        temperature: 0.25,
        max_tokens,
        prompt,
      });
      summary = response.trim();
    }
    return [summary];
  }

  async generateResumeWorkHistory(input: ResumeInput): Promise<string[]> {
    let histories = [""];
    const validWorkItems = input.workplaces.items.filter((e) =>
      isValidWorkHistory(e)
    );
    if (validWorkItems.length === 0) {
      histories = [
        "Please make sure to provide some information about your previous and current roles.",
      ];
    } else {
      for (const workplace of validWorkItems) {
        const prompt = new ResumeWorkHistoryPromptBuilder().build(
          input.workplaces.question,
          workplace
        );
        const max_tokens = prompt.length + 500;
        const response = await this.getResponse({
          model: this.MODEL,
          temperature: 0.25,
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
        histories.push(result);
      }
    }
    histories = histories.filter((e) => !!e);
    return histories;
  }

  async generateResumeEducationHistory(input: ResumeInput): Promise<string[]> {
    let educations = [""];
    const validEducationItems = input.education.items.filter((e) =>
      isValidEducationHistory(e)
    );
    if (validEducationItems.length === 0) {
      educations = [
        "Please make sure to provide some information about your education.",
      ];
    } else {
      for (const education of validEducationItems) {
        const result = [
          `School: ${education.school}`,
          `Degree: ${education.degree} (${education.start} - ${education.end})`,
        ];

        if (education.details) {
          const prompt = new ResumeEducationHistoryPromptBuilder().build(
            input.education.question,
            education
          );
          const max_tokens = prompt.length + 350;
          const response = await this.getResponse({
            model: this.MODEL,
            temperature: 0.25,
            max_tokens,
            prompt,
          });

          result.push("");
          result.push(response.trim());
        }

        educations.push(result.join("\n").trim());
      }
    }
    educations = educations.filter((e) => !!e);
    return educations;
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
