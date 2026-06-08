import type { DocumentStatisticsResult } from '../documentStatistics';
import { perTokenUsd } from '../llmCalculations';
import { formatDecimal, formatDecimalTrimmed, namedField } from '../format';
import type { LlmCalculationsResult } from '../llmCalculations';
import type { TokenPrices } from '../../prices/types';

function fmtPerToken(fieldName: string, pricePerMillion: number): string {
  return namedField(fieldName, `${formatDecimalTrimmed(perTokenUsd(pricePerMillion))} USD`);
}

export function avgInputPromptsCostTooltip(
  stats: DocumentStatisticsResult,
  prices: TokenPrices,
): string {
  return [
    namedField('Number of prompts', stats.numberOfPrompts),
    namedField('Avg input token per prompt', stats.avgInputTokenPerPrompt),
    fmtPerToken('Input Cost Per Token', prices.baseInputTokens),
  ].join(' × ');
}

export function avgOutputPromptsCostTooltip(
  stats: DocumentStatisticsResult,
  prices: TokenPrices,
): string {
  return [
    namedField('Number of prompts', stats.numberOfPrompts),
    namedField('Avg output tokens per prompt', stats.avgOutputTokensPerPrompt),
    fmtPerToken('Output Cost Per Token', prices.outputTokens),
  ].join(' × ');
}

export function pdfCachingCostTooltip(
  stats: DocumentStatisticsResult,
  prices: TokenPrices,
): string {
  return [
    namedField('One submission contains aprx. pages', stats.pagesPerSubmission),
    namedField('Avg input token for caching 1 page of PDF', stats.avgInputTokenPerPagePdf),
    fmtPerToken('Input Caching Cost per token', prices.cacheWrites5m),
  ].join(' × ');
}

export function pdfCacheReadCostTooltip(
  stats: DocumentStatisticsResult,
  prices: TokenPrices,
): string {
  return [
    fmtPerToken('Output Caching Cost Per Token', prices.cacheHitsRefreshes),
    namedField('Avg input token for caching 1 page of PDF', stats.avgInputTokenPerPagePdf),
    namedField('One submission contains aprx. pages', stats.pagesPerSubmission),
    namedField('Number of prompts', stats.numberOfPrompts),
  ].join(' × ');
}

export function finalCostUsdTooltip(calculations: LlmCalculationsResult): string {
  return [
    namedField('Avarage cost for all input of prompts', `${formatDecimal(calculations.avgInputPromptsCostUsd, 2)} USD`),
    namedField('Avarage cost for all output of prompts', `${formatDecimal(calculations.avgOutputPromptsCostUsd, 2)} USD`),
    namedField('Cost for caching the PDF one time', `${formatDecimal(calculations.pdfCachingCostUsd, 2)} USD`),
    namedField('Cost for reading PDF from cache', `${formatDecimal(calculations.pdfCacheReadCostUsd, 2)} USD`),
  ].join(' + ');
}

export function finalCostGbpTooltip(
  calculations: LlmCalculationsResult,
  exchangeRate: number,
): string {
  return `${namedField('Final cost per submission ($)', `${formatDecimal(calculations.finalCostPerSubmissionUsd, 2)} USD`)} × ${namedField('Exchange rate', exchangeRate)}`;
}

export function monthlyOcrLlmCostsUsdTooltip(
  stats: DocumentStatisticsResult,
  calculations: LlmCalculationsResult,
): string {
  return `${namedField('Average number of submissions (monthly)', stats.averageSubmissionsMonthly)} × ${namedField('Final cost per submission ($)', `${formatDecimal(calculations.finalCostPerSubmissionUsd, 2)} USD`)}`;
}

export function monthlyOcrLlmCostsGbpTooltip(
  calculations: LlmCalculationsResult,
  exchangeRate: number,
): string {
  return `${namedField('Monthly OCR & LLM costs ($)', `${formatDecimal(calculations.monthlyOcrLlmCostsUsd, 2)} USD`)} × ${namedField('Exchange rate', exchangeRate)}`;
}
