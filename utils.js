import OpenAI from "openai";

const cdpPort = 9222

export const underscoreToCapitalCase = (str) => {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


export const run = async (callback) => {
    try {
        await callback()
    } catch (error) {
        console.log(error)
    } finally {
        console.log("Cell done executing")
    };
}

export const handleDropDown = async (observeDescription, customArgument) => {
  const observation = await page.observe(observeDescription);
  const firstObservationAction = observation[0];
  firstObservationAction.arguments = [customArgument, 'Enter'] ;
  firstObservationAction.method = 'pressSequentially';
  console.log(firstObservationAction);
  await page.act(firstObservationAction);
}

export const initLocalStagehand = async () => {
    const stagehand = new Stagehand({
    verbose: 1, // Verbosity level for logging: 0 = silent, 1 = info, 2 = all
    domSettleTimeoutMs: 30_000, // Timeout for DOM to settle in milliseconds

    // LLM configuration
    modelName: "gpt-4.1-mini", // Name of the model to use
    modelClientOptions: {
      apiKey: process.env.OPENAI_API_KEY,
    }, // Configuration options for the model client

    // Browser configuration
    env: "LOCAL", // Environment to run in: LOCAL or BROWSERBASE
    localBrowserLaunchOptions: {
      cdpUrl: `http://localhost:${cdpPort}`,
      viewport: {
        width: 1024,
        height: 768,
      },
    }, // Configuration options for the local browser
  });
  await stagehand.init();

  let page = stagehand.page
  console.log("Stagehand initialized successfully!");
  return page
}

export const initLocalOpenAI = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  return openai;
};

export async function multipleOptionGPT(description, question, options, openai) {
  let prompt = `I have the following question and business description. 
  Your task is to determine ALL options that correctly apply based on the description.

  Respond ONLY with the NUMBERS (starting at 0) of ALL correct options, separated by commas, in ascending order, with no spaces or explanations.

  Example valid responses: 0,2 or 1,3,4

  Description: ${description}

  Question: ${question}

  Options:
  `;

  options.forEach((opt, idx) => {
    prompt += `${idx}: ${opt}\n`;
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ]
  });

  const rawAnswer = completion.choices[0].message.content.trim();

  // Parse response into array of indices
  const matches = rawAnswer.match(/\d+/g);
  if (!matches) {
    throw new Error(`Could not parse valid option numbers from GPT response: "${rawAnswer}"`);
  }

  const indices = matches.map(str => {
    const n = parseInt(str, 10);
    if (n < 0 || n >= options.length) {
      throw new Error(`Returned index ${n} out of bounds for options length ${options.length}`);
    }
    return n;
  });

  // Remove duplicates & sort
  const uniqueSorted = Array.from(new Set(indices)).sort((a, b) => a - b);

  return uniqueSorted;
}

export async function askGptForOption(description, question, options, openai) {
  let prompt = `I have the following question and business description. 
  Your task is to ONLY answer with the NUMBER (starting at 0) of the most correct option based on the description.
  Do not explain your answer. Respond ONLY with the number, nothing else.

  Description: ${description}

  Question: ${question}

  Options:
  `;

  options.forEach((opt, idx) => {
    prompt += `${idx}: ${opt}\n`;
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ]
  });

  const rawAnswer = completion.choices[0].message.content.trim();

  // Extract integer robustly
  const match = rawAnswer.match(/\d+/);
  if (!match) {
    throw new Error(`Could not parse a valid option number from GPT response: "${rawAnswer}"`);
  }

  const index = parseInt(match[0], 10);
  if (index < 0 || index >= options.length) {
    throw new Error(`Returned index ${index} out of bounds for options length ${options.length}`);
  }

  return index;
}

export async function askYesNoGPT(description, question, openai) {

  const prompt = `You will receive a business description and a Yes/No question that relates to the nature of the business. Answer strictly with:

  "0" if the correct answer is Yes.
  "1" if the correct answer is No.

  Don't answer with anything but 0 or 1.

  Business Description:
  ${description}

  Question:
  ${question}

  Respond now:`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ]
  });

  const rawAnswer = completion.choices[0].message.content.trim();
  console.log(`✅ GPT raw answer: "${rawAnswer}"`);

  if (rawAnswer === "1") return 1;
  if (rawAnswer === "0") return 0;

  // Fallback handling if GPT outputs "Yes"/"No" instead
  const lower = rawAnswer.toLowerCase();
  if (lower.includes("yes")) return 0;
  if (lower.includes("no")) return 1;

  throw new Error(`Invalid GPT response: "${rawAnswer}"`);
}