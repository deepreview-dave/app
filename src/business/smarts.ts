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
  role?: string;
  department?: string;
}

export const getSomeData = async (details: ReviewedDetails): Promise<string | undefined> => {

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

const buildPrompt = (details: ReviewedDetails): string => {
  let promt = `Write a performace review for ${details.name} `;

  if (details.role) {
    promt += `who is in the ${details.role} `;
  }

  if (details.department) {
    promt += `in the ${details.department} department `;
  }

  switch (details.performanceScore) {
    case PerformanceScore.BELOW_EXPECTATIONS: {
      promt += `and is performing below expectations `;
      break;
    }
    case PerformanceScore.MEETS_EXPECTATIONS: {
      promt += `and is meeting expectations `;
      break;
    }
    case PerformanceScore.ABOVE_EXPECTATIONS: {
      promt += `and is performing above expectations `;
      break;
    }
  }

  return promt;
}
