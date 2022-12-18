const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});

export async function getSomeData(prompt: string): Promise<string|undefined> {
    const openai = new OpenAIApi(configuration);
    try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 0,
          max_tokens: 100,
        });
        return response.data.choices[0].text;
    } catch (e) {
        console.log(`Something bad happened ${e}`);
        return undefined;
    }
}