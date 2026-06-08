import type { ModelPricing } from './types';

/** OpenAI GPT-4o — prompt caching is automatic; no separate cache-write surcharge. */
export const openaiGpt4o: ModelPricing = {
  id: 'openai-gpt-4o',
  label: 'OpenAI GPT-4o',
  prices: {
    baseInputTokens: 2.5,
    cacheWrites5m: 2.5,
    cacheWrites1h: 2.5,
    cacheHitsRefreshes: 1.25,
    outputTokens: 10.0,
  },
};
