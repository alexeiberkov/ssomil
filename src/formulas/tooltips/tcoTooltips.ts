import type { TokenPrices } from '../../prices/types';
import { formatDecimal, formatGrouped, namedField } from '../format';
import {
  infrastructurePerPageUsd,
  infrastructurePerSubmissionUsd,
} from '../infrastructureCost';
import { calculateLlmCostPerPageUsd, calculateLlmCostUsd } from '../llmCost';
import {
  serviceManagementPerPageUsd,
  serviceManagementPerSubmissionUsd,
} from '../serviceManagementCost';
import { pagesPerSubmission, tokensPerSubmission } from '../tokenUsage';

const MILLION = 1_000_000;

const tokenFieldNames: Record<keyof typeof tokensPerSubmission, string> = {
  baseInputTokens: 'Base Input Tokens',
  cacheWrites5m: '5m Cache Writes',
  cacheWrites1h: '1h Cache Writes',
  cacheHitsRefreshes: 'Cache Hits & Refreshes',
  outputTokens: 'Output Tokens',
};

function tokenCostTerm(
  fieldName: string,
  tokenCount: number,
  pricePerMillion: number,
): string {
  return `${namedField(fieldName, formatGrouped(tokenCount))} × ${namedField(`${fieldName} price`, `${formatDecimal(pricePerMillion)} USD / ${formatGrouped(MILLION)}`)}`;
}

export function llmSubmissionUsdTooltip(prices: TokenPrices): string {
  const usage = tokensPerSubmission;
  return (Object.keys(usage) as (keyof typeof tokensPerSubmission)[])
    .map((key) => tokenCostTerm(tokenFieldNames[key], usage[key], prices[key]))
    .join(' + ');
}

export function llmPageUsdTooltip(prices: TokenPrices): string {
  const submissionCost = calculateLlmCostUsd(prices);
  return `${namedField('LLM costs (per submission)', `${formatDecimal(submissionCost, 4)} USD`)} / ${namedField('One submission contains aprx. pages', pagesPerSubmission)}`;
}

export function infrastructureSubmissionUsdTooltip(): string {
  return `${namedField('Infrastructure Costs (per submission)', 'fixed rate')} = ${formatDecimal(infrastructurePerSubmissionUsd, 4)} USD`;
}

export function infrastructurePageUsdTooltip(): string {
  return `${namedField('Infrastructure Costs (per page)', 'fixed rate')} = ${formatDecimal(infrastructurePerPageUsd, 4)} USD`;
}

export function serviceManagementSubmissionUsdTooltip(): string {
  return `${namedField('Service management and CR fee (per submission)', 'fixed rate')} = ${formatDecimal(serviceManagementPerSubmissionUsd, 4)} USD`;
}

export function serviceManagementPageUsdTooltip(): string {
  return `${namedField('Service management and CR fee (per page)', 'fixed rate')} = ${formatDecimal(serviceManagementPerPageUsd, 4)} USD`;
}

export function summaryUsdTooltip(
  llmUsd: number,
  infrastructureUsd: number,
  serviceManagementUsd: number,
  variant: 'submission' | 'page',
): string {
  const suffix = variant === 'submission' ? '(per submission)' : '(per page)';
  return [
    namedField(`LLM costs ${suffix}`, `${formatDecimal(llmUsd, 4)} USD`),
    namedField(`Infrastructure Costs ${suffix}`, `${formatDecimal(infrastructureUsd, 4)} USD`),
    namedField(`Service management and CR fee ${suffix}`, `${formatDecimal(serviceManagementUsd, 4)} USD`),
  ].join(' + ');
}

export function gbpTooltip(usd: number, exchangeRate: number): string {
  return `${namedField('USD amount', `${formatDecimal(usd, 4)} USD`)} × ${namedField('Exchange rate', exchangeRate)} = ${formatDecimal(usd * exchangeRate, 4)} GBP`;
}

export type TcoMetric = 'llm' | 'infrastructure' | 'serviceManagement' | 'summary';
export type TcoVariant = 'submission' | 'page';

interface TcoTooltipContext {
  prices: TokenPrices;
  variant: TcoVariant;
  metric: TcoMetric;
  llmUsd: number;
  infrastructureUsd: number;
  serviceManagementUsd: number;
}

function usdTooltipForMetric(ctx: TcoTooltipContext): string {
  const { prices, variant, metric, llmUsd, infrastructureUsd, serviceManagementUsd } = ctx;

  switch (metric) {
    case 'llm':
      return variant === 'submission'
        ? llmSubmissionUsdTooltip(prices)
        : llmPageUsdTooltip(prices);
    case 'infrastructure':
      return variant === 'submission'
        ? infrastructureSubmissionUsdTooltip()
        : infrastructurePageUsdTooltip();
    case 'serviceManagement':
      return variant === 'submission'
        ? serviceManagementSubmissionUsdTooltip()
        : serviceManagementPageUsdTooltip();
    case 'summary':
      return summaryUsdTooltip(llmUsd, infrastructureUsd, serviceManagementUsd, variant);
  }
}

export function tcoUsdTooltip(ctx: TcoTooltipContext): string {
  return usdTooltipForMetric(ctx);
}

export function tcoGbpTooltip(usd: number, exchangeRate: number): string {
  return gbpTooltip(usd, exchangeRate);
}

export function getTcoRowAmounts(variant: TcoVariant, prices: TokenPrices) {
  const llmUsd =
    variant === 'submission'
      ? calculateLlmCostUsd(prices)
      : calculateLlmCostPerPageUsd(prices);
  const infrastructureUsd =
    variant === 'submission'
      ? infrastructurePerSubmissionUsd
      : infrastructurePerPageUsd;
  const serviceManagementUsd =
    variant === 'submission'
      ? serviceManagementPerSubmissionUsd
      : serviceManagementPerPageUsd;

  return { llmUsd, infrastructureUsd, serviceManagementUsd };
}
