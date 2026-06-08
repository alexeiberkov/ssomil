/** Token consumption assumptions per DEPS submission. */
export const tokensPerSubmission = {
  baseInputTokens: 385_000,
  cacheWrites5m: 100_000,
  cacheWrites1h: 50_000,
  cacheHitsRefreshes: 500_000,
  outputTokens: 100_000,
};

/** Average pages per submission — used to derive per-page LLM costs. */
export const pagesPerSubmission = 60;
