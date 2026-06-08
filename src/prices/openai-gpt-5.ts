import type { ModelPricing } from './types';

/** OpenAI GPT-5 — prompt caching is automatic; no separate cache-write surcharge. */
export const openaiGpt5: ModelPricing = {
  id: 'openai-gpt-5',
  label: 'OpenAI GPT-5',
  prices: {
    baseInputTokens: 1.25,
    cacheWrites5m: 1.25,
    cacheWrites1h: 1.25,
    cacheHitsRefreshes: 0.125,
    outputTokens: 10.0,
  },
};
