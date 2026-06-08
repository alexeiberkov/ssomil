export interface TokenPrices {
  /** USD per 1M tokens — standard input. */
  baseInputTokens: number;
  /** USD per 1M tokens — cache write (Anthropic) or first-request input (OpenAI, same as base). */
  cacheWrites5m: number;
  /** USD per 1M tokens — 1h cache write (Anthropic) or same as base for OpenAI. */
  cacheWrites1h: number;
  /** USD per 1M tokens — cache read (Anthropic) or cached input (OpenAI). */
  cacheHitsRefreshes: number;
  /** USD per 1M tokens — output. */
  outputTokens: number;
}

export interface ModelPricing {
  id: string;
  label: string;
  prices: TokenPrices;
}
