export interface TokenPrices {
  /** USD per 1M tokens */
  baseInputTokens: number;
  cacheWrites5m: number;
  cacheWrites1h: number;
  cacheHitsRefreshes: number;
  outputTokens: number;
}

export interface ModelPricing {
  id: string;
  label: string;
  prices: TokenPrices;
}
