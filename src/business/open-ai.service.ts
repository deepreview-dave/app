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
  PraisePromptBuilder,
  SummariseToBulletPointsPromptBuilder,
} from "./prompt-builder";
import {
  AIResult,
  CoverLetterInput,
  PerformanceReviewInput,
  PerformanceScore,
  PraiseInput,
  ReferralLetterInput,
  ResumeAnalyserDetails,
  ResumeAnalyserEducationHistory,
  ResumeAnalyserWorkHistory,
  ResumeDetailsInput,
  ResumeSummaryInput,
  ReviewTone,
} from "./common";
import { Configuration, OpenAIApi } from "openai";
import fetchAdapter from "@haverstack/axios-fetch-adapter";
import {
  ResumeEducationHistory,
  ResumeWorkHistory,
} from "../state/resume.state";
import { Analytics } from "./analytics";

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
    this.apiKey = process.env.REACT_APP_OPEN_AI_KEY_2;

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

    Analytics.generated();

    return response
      .split(".")
      .map((e) => e.trim())
      .filter((e) => !!e)
      .map((original) => ({
        original,
        expanded: original,
        editable: true,
        joined: false,
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

    Analytics.generated();

    return response
      .split(".")
      .map((e) => e.trim())
      .filter((e) => !!e)
      .map((original) => ({
        original,
        expanded: original,
        editable: true,
        joined: false,
      }));
  }

  async generatePraise(input: PraiseInput): Promise<AIResult[]> {
    const builder = new PraisePromptBuilder();
    const prompt = builder.build(input);
    const max_tokens = prompt.length + 1500;

    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.25,
      max_tokens,
      prompt,
    });

    Analytics.generated();

    return response
      .split(".")
      .map((e) => e.trim())
      .filter((e) => !!e)
      .map((original) => ({
        original,
        expanded: original,
        editable: true,
        joined: false,
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

    Analytics.generated();

    const aiResult = response
      .split(".")
      .map((e) => e.trim())
      .filter((e) => !!e)
      .map((value) => ({
        original: value,
        expanded: value,
        editable: true,
        joined: false,
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
    };

    return [bakedAiResult, ...aiResult];
  }

  async generateResumeDetails(input: ResumeDetailsInput): Promise<AIResult[]> {
    const result = OpenAIServiceUtils.getBakedDetailsResult(input);
    Analytics.generated();
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
      };
    }
    Analytics.generated();
    return [summary];
  }

  async generateBulletPointSummary(
    question: string,
    text: string
  ): Promise<AIResult[]> {
    const prompt = new SummariseToBulletPointsPromptBuilder().build(
      question,
      text
    );
    const max_tokens = prompt.length + 750;
    const response = await this.getResponse({
      model: this.MODEL,
      temperature: 0.25,
      max_tokens,
      prompt,
    });
    const value = response.trim();
    Analytics.generated();
    return [
      {
        original: value,
        expanded: value,
        editable: true,
        joined: false,
      },
    ];
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
    const baked = OpenAIServiceUtils.getBakedWorkResults(input);
    const value = response.trim();
    const aiResult = {
      original: value,
      expanded: value,
      editable: true,
      joined: false,
    };
    Analytics.generated();
    return [baked, aiResult];
  }

  async generateEducationHistoryItem(
    question: string,
    input: ResumeEducationHistory
  ): Promise<AIResult[]> {
    const bakedResult = OpenAIServiceUtils.getBakedEducationResult(input);

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
    };
    Analytics.generated();
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
    Analytics.expanded();
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

    Analytics.generated();
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
    Analytics.generated();
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
    Analytics.generated();
    return response.trim();
  }

  private async getResponse(input: NetworkInput): Promise<string> {
    try {
      const response = (await this.api.createCompletion(
        input
      )) as NetworkResponse;

      if (response.status !== 200) {
        Analytics.generateError();
        throw new Error(OpenAIErrorMessage.BadStatus);
      } else if (response.data.choices.length === 0) {
        Analytics.generateError();
        throw new Error(OpenAIErrorMessage.NoContent);
      } else if (response.data.choices[0].text === undefined) {
        Analytics.generateError();
        throw new Error(OpenAIErrorMessage.MissingText);
      }

      return response.data.choices[0].text ?? "";
    } catch (e) {
      Analytics.generateError();
      throw new Error(OpenAIErrorMessage.Network);
    }
  }
}

export class OpenAIServiceUtils {
  static getBakedDetailsResult(input: ResumeAnalyserDetails): AIResult {
    const details = [
      `Name: ${input.name}`,
      `Address: ${input.address}`,
      `Phone: ${input.phone}`,
      `Email: ${input.email}`,
    ];
    if (input.linkedin) {
      details.push(`Linkedin: ${input.linkedin}`);
    }
    if (input.website) {
      details.push(`Website: ${input.website}`);
    }

    return {
      original: details.join("\n"),
      expanded: details.join("\n"),
      editable: false,
      joined: false,
    };
  }

  static getBakedWorkResults(input: ResumeAnalyserWorkHistory): AIResult {
    const bakedResult = [
      `Company: ${input.company}`,
      `Role: ${input.role} (${input.start} - ${input.end})`,
    ].join("\n");
    return {
      original: bakedResult,
      expanded: bakedResult,
      editable: false,
      joined: true,
    };
  }

  static getBakedEducationResult(
    input: ResumeAnalyserEducationHistory
  ): AIResult {
    const result = [
      `School: ${input.school}`,
      `Degree: ${input.degree} (${input.start} - ${input.end})`,
    ].join("\n");

    return {
      original: result,
      expanded: result,
      editable: false,
      joined: true,
    };
  }
}
