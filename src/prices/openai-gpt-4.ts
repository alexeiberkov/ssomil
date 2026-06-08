import type { ModelPricing } from './types';

export const openaiGpt4: ModelPricing = {
  id: 'openai-gpt-4',
  label: 'OpenAI GPT 4',
  prices: {
    baseInputTokens: 2.5,
    cacheWrites5m: 2.5,
    cacheWrites1h: 2.5,
    cacheHitsRefreshes: 1.25,
    outputTokens: 10.0,
  },
};
