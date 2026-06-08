import type { ModelPricing } from './types';

export const anthropicSonnet45: ModelPricing = {
  id: 'anthropic-sonnet-4.5',
  label: 'Anthropic Sonnet 4.5',
  prices: {
    baseInputTokens: 3.0,
    cacheWrites5m: 3.75,
    cacheWrites1h: 6.0,
    cacheHitsRefreshes: 0.3,
    outputTokens: 15.0,
  },
};
