import {
  FlexiblePromptBuilder,
  InspirationPromptBuilder,
} from "./prompt-builder";
import { PerformanceReviewInput, PerformanceScore, ReviewTone } from "./common";

export const generateMainText = async (
  input?: PerformanceReviewInput
): Promise<string[]> => {
  if (!input) {
    return [];
  }

  const builder = new FlexiblePromptBuilder();
  const prompt = builder.build(input);
  const max_tokens = prompt.length + 2000;
  const data = {
    model: "text-davinci-003",
    temperature: 0.25,
    max_tokens,
    prompt,
  };

  const rawResponse = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.json();
  const rawResult = content["choices"][0]["text"] as string;

  return rawResult
    .replace(/\n/g, "\n")
    .split("\n")
    .flatMap((e) => e.split("."))
    .filter((e) => e !== "")
    .filter((e) => e !== "\n")
    .map((e) => e.trim());
};

export const expandOnText = async (
  result: string,
  extra_tokens = 1000
): Promise<string> => {
  const prompt = `Expand just a little bit on the following: ${result}`;
  const max_tokens = prompt.length + extra_tokens;
  const data = {
    model: "text-davinci-003",
    temperature: 0.15,
    max_tokens,
    prompt,
  };
  const rawResponse = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.json();
  return (content["choices"][0]["text"] as string).trim();
};

export const giveHints = async (
  role: string | undefined,
  performance: PerformanceScore,
  tone: ReviewTone
): Promise<string> => {
  const prompt = new InspirationPromptBuilder().build(role, performance, tone);
  const max_tokens = prompt.length + 1000;
  const data = {
    model: "text-davinci-003",
    temperature: 0.15,
    max_tokens,
    prompt,
  };
  const rawResponse = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.json();
  return (content["choices"][0]["text"] as string).trim();
};
