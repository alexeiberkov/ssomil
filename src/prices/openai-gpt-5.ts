import type { ModelPricing } from './types';

export const openaiGpt5: ModelPricing = {
  id: 'openai-gpt-5',
  label: 'OpenAI GPT 5',
  prices: {
    baseInputTokens: 5.0,
    cacheWrites5m: 5.0,
    cacheWrites1h: 5.0,
    cacheHitsRefreshes: 2.5,
    outputTokens: 20.0,
  },
};
