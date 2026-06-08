import type { TokenPrices } from '../prices/types';
import { pagesPerSubmission, tokensPerSubmission } from './tokenUsage';

const MILLION = 1_000_000;

function costForTokens(tokenCount: number, pricePerMillion: number): number {
  return (tokenCount / MILLION) * pricePerMillion;
}

export function calculateLlmCostUsd(prices: TokenPrices): number {
  const usage = tokensPerSubmission;
  return (
    costForTokens(usage.baseInputTokens, prices.baseInputTokens) +
    costForTokens(usage.cacheWrites5m, prices.cacheWrites5m) +
    costForTokens(usage.cacheWrites1h, prices.cacheWrites1h) +
    costForTokens(usage.cacheHitsRefreshes, prices.cacheHitsRefreshes) +
    costForTokens(usage.outputTokens, prices.outputTokens)
  );
}

export function calculateLlmCostPerPageUsd(prices: TokenPrices): number {
  return calculateLlmCostUsd(prices) / pagesPerSubmission;
}
