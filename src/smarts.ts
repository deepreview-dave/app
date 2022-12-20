const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});

export enum PerformanceScore {
  BELOW_EXPECTATIONS = "below-expectations",
  MEETS_EXPECTATIONS = "meets-expectations",
  ABOVE_EXPECTATIONS = "above-expectations",
}

export interface ReviewedDetails {
  name: string;
  performanceScore: PerformanceScore;
}

export async function getSomeData(
  details: ReviewedDetails
): Promise<string | undefined> {
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: buildPrompt(details),
      temperature: 0,
      max_tokens: 100,
    });
    return response.data.choices[0].text;
  } catch (e) {
    console.log(`Something bad happened ${e}`);
    return undefined;
  }
}

function buildPrompt(details: ReviewedDetails): string {
  switch (details.performanceScore) {
    case PerformanceScore.BELOW_EXPECTATIONS:
      return `Write a performance review for ${details.name} who is below expectations`;
    case PerformanceScore.MEETS_EXPECTATIONS:
      return `Write a performance review for ${details.name} who meets expectations`;
    case PerformanceScore.ABOVE_EXPECTATIONS:
      return `Write a performance review for ${details.name} who is above expectations`;
  }
}
