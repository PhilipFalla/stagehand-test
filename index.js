import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_MODEL = 'gpt-4o-mini';

/**
 * Simple prompt function that takes a prompt and returns a response
 * @param {string} prompt - The prompt to send to OpenAI
 * @param {Object} options - Optional configuration
 * @param {string} options.model - Model to use
 * @param {number} options.temperature - Temperature for response randomness
 * @param {number} options.maxTokens - Maximum tokens in response
 * @returns {Promise<string>} - The AI response
 */
export async function prompt(prompt, options = {}) {
  const {
    model = DEFAULT_MODEL,
    temperature = 0.7,
    maxTokens = 1000,
  } = options;

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt must be a non-empty string');
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
      max_tokens: maxTokens,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API request failed: ${error.message}`);
  }
}

/**
 * Structured output function that uses Zod schema to validate and parse response
 * @param {string} prompt - The prompt to send to OpenAI
 * @param {z.ZodSchema} schema - Zod schema for structured output validation
 * @param {Object} options - Optional configuration
 * @param {string} options.model - Model to use (defaults to gpt-4o-mini)
 * @param {number} options.temperature - Temperature for response randomness (0-2)
 * @param {number} options.maxRetries - Maximum retry attempts for parsing failures
 * @returns {Promise<Object>} - Parsed and validated response object
 */
export async function structuredPrompt(prompt, schema, options = {}) {
  const {
    model = DEFAULT_MODEL,
    temperature = 0.1, // Lower temperature for more consistent structured output
    maxRetries = 3,
  } = options;

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt must be a non-empty string');
  }

  if (!schema || typeof schema.parse !== 'function') {
    throw new Error('Schema must be a valid Zod schema');
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  try {
    const response = await openai.responses.parse({
      model: DEFAULT_MODEL,
      input: [{ role: 'user', content: prompt }],
      text: {
        format: zodTextFormat(schema, "result")
      },
    })

    return response.output_parsed || '';

  } catch (error) {
    console.error('Error parsing response:', error);
    throw error;
  }
}


export async function generateStateAddress (state) {
  const prompt = 'Generate a real, valid and verifiable address in the state of ' + state + '\nDo not abbreviate the state name';

  const schema = z.object({
    street1: z.string().min(2).max(100),
    street2: z.string().min(2).max(100),
    city: z.string().min(2).max(100),
    state: z.string().min(2).max(100),
    postal: z.string().min(2).max(100),
    county: z.string().min(0).max(100),
  });

  return await structuredPrompt(prompt, schema)



}

export { openai };
