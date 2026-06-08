import type { ModelPricing } from './types';

export const claudeHaiku45: ModelPricing = {
  id: 'claude-haiku-4.5',
  label: 'Claude Haiku 4.5',
  prices: {
    baseInputTokens: 1.0,
    cacheWrites5m: 1.25,
    cacheWrites1h: 2.0,
    cacheHitsRefreshes: 0.1,
    outputTokens: 5.0,
  },
};
