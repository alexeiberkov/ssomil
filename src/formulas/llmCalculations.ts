import type { DocumentStatisticsResult } from './documentStatistics';
import { toGbp } from './exchangeRate';
import type { TokenPrices } from '../prices/types';

const MILLION = 1_000_000;

export function perTokenUsd(pricePerMillion: number): number {
  return pricePerMillion / MILLION;
}

export interface LlmCalculationsResult {
  avgInputPromptsCostUsd: number;
  avgOutputPromptsCostUsd: number;
  pdfCachingCostUsd: number;
  pdfCacheReadCostUsd: number;
  finalCostPerSubmissionUsd: number;
  finalCostPerSubmissionGbp: number;
  monthlyOcrLlmCostsUsd: number;
  monthlyOcrLlmCostsGbp: number;
}

export function calculateLlmCalculations(
  stats: DocumentStatisticsResult,
  prices: TokenPrices,
  exchangeRate: number,
): LlmCalculationsResult {
  const inputCostPerToken = perTokenUsd(prices.baseInputTokens);
  const inputCachingCostPerToken = perTokenUsd(prices.cacheWrites5m);
  const outputCostPerToken = perTokenUsd(prices.outputTokens);
  const outputCachingCostPerToken = perTokenUsd(prices.cacheHitsRefreshes);

  const avgInputPromptsCostUsd =
    stats.numberOfPrompts * stats.avgInputTokenPerPrompt * inputCostPerToken;

  const avgOutputPromptsCostUsd =
    stats.numberOfPrompts * stats.avgOutputTokensPerPrompt * outputCostPerToken;

  const pdfCachingCostUsd =
    stats.pagesPerSubmission *
    stats.avgInputTokenPerPagePdf *
    inputCachingCostPerToken;

  const pdfCacheReadCostUsd =
    outputCachingCostPerToken *
    stats.avgInputTokenPerPagePdf *
    stats.pagesPerSubmission *
    stats.numberOfPrompts;

  const finalCostPerSubmissionUsd =
    avgInputPromptsCostUsd +
    avgOutputPromptsCostUsd +
    pdfCachingCostUsd +
    pdfCacheReadCostUsd;

  const finalCostPerSubmissionGbp = toGbp(finalCostPerSubmissionUsd, exchangeRate);

  const monthlyOcrLlmCostsUsd =
    stats.averageSubmissionsMonthly * finalCostPerSubmissionUsd;
  const monthlyOcrLlmCostsGbp = toGbp(monthlyOcrLlmCostsUsd, exchangeRate);

  return {
    avgInputPromptsCostUsd,
    avgOutputPromptsCostUsd,
    pdfCachingCostUsd,
    pdfCacheReadCostUsd,
    finalCostPerSubmissionUsd,
    finalCostPerSubmissionGbp,
    monthlyOcrLlmCostsUsd,
    monthlyOcrLlmCostsGbp,
  };
}
