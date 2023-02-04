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
  AIResult,
  CoverLetterInput,
  PerformanceReviewInput,
  PerformanceScore,
  ReferralLetterInput,
  ResumeDetailsInput,
  ResumeSummaryInput,
  ReviewTone,
  ToolName,
} from "./common";
import { Configuration, OpenAIApi } from "openai";
import fetchAdapter from "@haverstack/axios-fetch-adapter";
import {
  ResumeEducationHistory,
  ResumeWorkHistory,
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
  ): Promise<AIResult[]> {
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
      .filter((e) => !!e)
      .map((original) => ({
        original,
        expanded: original,
        editable: true,
        joined: false,
        tool: ToolName.PerformanceReview,
      }));
  }

  async generateCoverLetter(input: CoverLetterInput): Promise<AIResult[]> {
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
      .filter((e) => !!e)
      .map((original) => ({
        original,
        expanded: original,
        editable: true,
        joined: false,
        tool: ToolName.CoverLetter,
      }));
  }

  async generateReferralLetter(
    input: ReferralLetterInput
  ): Promise<AIResult[]> {
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
      .filter((e) => !!e)
      .map((value) => ({
        original: value,
        expanded: value,
        editable: true,
        joined: false,
        tool: ToolName.ReferralLetter,
      }));

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
    const bakedAiResult = {
      original: bakedResults,
      expanded: bakedResults,
      editable: false,
      joined: false,
      tool: ToolName.ReferralLetter,
    };

    return [bakedAiResult, ...aiResult];
  }

  async generateResumeDetails(input: ResumeDetailsInput): Promise<AIResult[]> {
    const details = [
      `Name: ${input.name}`,
      `Address: ${input.address}`,
      `Phone: ${input.phone}`,
      `Email: ${input.email}`,
    ].join("\n");
    const result = {
      original: details,
      expanded: details,
      editable: false,
      joined: false,
      tool: ToolName.Resume_Details,
    };
    return [result];
  }

  async generateResumeSummary(
    input: ResumeSummaryInput,
    name: string
  ): Promise<AIResult[]> {
    let summary: AIResult;
    if (!input.summary) {
      const value = "Please make sure to provide some summary information.";
      summary = {
        original: value,
        expanded: value,
        editable: false,
        joined: false,
        tool: ToolName.None,
      };
    } else {
      const prompt = new ResumeSummaryPromptBuilder().build(input, name);
      const max_tokens = prompt.length + 2000;
      const response = await this.getResponse({
        model: this.MODEL,
        temperature: 0.25,
        max_tokens,
        prompt,
      });
      const value = response.trim();
      summary = {
        original: value,
        expanded: value,
        editable: true,
        joined: false,
        tool: ToolName.Resume_Summary,
      };
    }
    return [summary];
  }

  async generateResumeWorkHistoryItem(
    question: string,
    input: ResumeWorkHistory
  ): Promise<AIResult[]> {
    const prompt = new ResumeWorkHistoryPromptBuilder().build(question, input);
    const max_tokens = prompt.length + 500;
    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.25,
      max_tokens,
      prompt,
    });
    const bakedResult = [
      `Company: ${input.company}`,
      `Role: ${input.role} (${input.start} - ${input.end})`,
    ].join("\n");
    const baked = {
      original: bakedResult,
      expanded: bakedResult,
      editable: false,
      joined: true,
      tool: ToolName.Resume_Work,
    };

    const value = response.trim();
    const aiResult = {
      original: value,
      expanded: value,
      editable: true,
      joined: false,
      tool: ToolName.Resume_Work,
    };

    return [baked, aiResult];
  }

  async generateEducationHistoryItem(
    question: string,
    input: ResumeEducationHistory
  ): Promise<AIResult[]> {
    const result = [
      `School: ${input.school}`,
      `Degree: ${input.degree} (${input.start} - ${input.end})`,
    ].join("\n");

    const bakedResult = {
      original: result,
      expanded: result,
      editable: false,
      joined: true,
      tool: ToolName.Resume_Education,
    };

    if (!input.details) {
      return [bakedResult];
    }

    const prompt = new ResumeEducationHistoryPromptBuilder().build(
      question,
      input
    );
    const max_tokens = prompt.length + 500;
    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.25,
      max_tokens,
      prompt,
    });

    const value = response.trim();
    const aiResult = {
      original: value,
      expanded: value,
      editable: true,
      joined: false,
      tool: ToolName.Resume_Education,
    };

    return [bakedResult, aiResult];
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
