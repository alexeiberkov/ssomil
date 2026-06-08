import {
  calculateInfrastructureCostTotal,
  type InfrastructureCostColumnKey,
} from '../../content/infrastructureCost';
import type { DocumentStatisticsResult } from '../documentStatistics';
import { formatDecimal, namedField } from '../format';
import {
  calculateInfrastructurePerPageUsd,
  calculateInfrastructurePerSubmissionUsd,
} from '../infrastructureCost';
import type { LlmCalculationsResult } from '../llmCalculations';
import {
  finalCostUsdTooltip,
} from './llmCalculationsTooltips';
import { avgInfrastructureCostPerPageTooltip } from './infrastructureCostTooltips';
import {
  calculateSupportOnlyFeePerPageUsd,
  serviceManagementPerSubmissionUsd,
  supportOnlyFeeMonthlyUsd,
} from '../serviceManagementCost';

export function llmPageUsdTooltip(
  llmPerSubmissionUsd: number,
  stats: DocumentStatisticsResult,
): string {
  return `${namedField('LLM costs (per submission)', `${formatDecimal(llmPerSubmissionUsd, 4)} USD`)} / ${namedField('One submission contains aprx. pages', stats.pagesPerSubmission)}`;
}

export function llmGbpTooltip(
  llmUsd: number,
  exchangeRate: number,
  variant: 'submission' | 'page',
): string {
  const label =
    variant === 'submission'
      ? 'LLM costs (per submission)'
      : 'LLM cost (per page)';
  return `${namedField(label, `${formatDecimal(llmUsd, 4)} USD`)} × ${namedField('Exchange rate', exchangeRate)}`;
}

export function infrastructureSubmissionUsdTooltip(
  stats: DocumentStatisticsResult,
  computeResourcePages: number,
  infrastructureColumnKey: InfrastructureCostColumnKey,
): string {
  const infrastructurePerPage = calculateInfrastructurePerPageUsd(
    computeResourcePages,
    infrastructureColumnKey,
  );
  return `${namedField('Infrastructure Costs (per page)', `${formatDecimal(infrastructurePerPage, 4)} USD`)} × ${namedField('One submission contains aprx. pages', stats.pagesPerSubmission)}`;
}

export function infrastructureGbpTooltip(
  infrastructureUsd: number,
  exchangeRate: number,
  variant: 'submission' | 'page',
): string {
  const label =
    variant === 'submission'
      ? 'Infrastructure Costs (per submission)'
      : 'Infrastructure Costs (per page)';
  return `${namedField(label, `${formatDecimal(infrastructureUsd, 4)} USD`)} × ${namedField('Exchange rate', exchangeRate)}`;
}

export function infrastructurePageUsdTooltip(
  computeResourcePages: number,
  infrastructureColumnKey: InfrastructureCostColumnKey,
): string {
  const total = calculateInfrastructureCostTotal();
  return avgInfrastructureCostPerPageTooltip(
    infrastructureColumnKey,
    total[infrastructureColumnKey],
    computeResourcePages,
  );
}

export function serviceManagementSubmissionUsdTooltip(): string {
  return `${namedField('Support only fee (per submission)', 'fixed rate')} = ${formatDecimal(serviceManagementPerSubmissionUsd, 4)} USD`;
}

export function serviceManagementPageUsdTooltip(
  stats: DocumentStatisticsResult,
): string {
  return `${namedField('Support only fee monthly budget', `${formatDecimal(supportOnlyFeeMonthlyUsd, 2)} USD`)} / (${namedField('Average number of submissions (monthly)', stats.averageSubmissionsMonthly)} × ${namedField('One submission contains aprx. pages', stats.pagesPerSubmission)})`;
}

export function summaryUsdTooltip(
  llmUsd: number,
  infrastructureUsd: number,
  serviceManagementUsd: number,
  variant: 'submission' | 'page',
): string {
  if (variant === 'page') {
    return [
      namedField('LLM cost', `${formatDecimal(llmUsd, 4)} USD`),
      namedField('Infrastructure Costs', `${formatDecimal(infrastructureUsd, 4)} USD`),
      namedField('Support only fee', `${formatDecimal(serviceManagementUsd, 4)} USD`),
    ].join(' + ');
  }

  return [
    namedField('LLM costs (per submission)', `${formatDecimal(llmUsd, 4)} USD`),
    namedField('Infrastructure Costs (per submission)', `${formatDecimal(infrastructureUsd, 4)} USD`),
    namedField('Support only fee (per submission)', `${formatDecimal(serviceManagementUsd, 4)} USD`),
  ].join(' + ');
}

export function gbpTooltip(usd: number, exchangeRate: number): string {
  return `${namedField('USD amount', `${formatDecimal(usd, 4)} USD`)} × ${namedField('Exchange rate', exchangeRate)}`;
}

export function supportOnlyFeeGbpTooltip(
  supportOnlyFeeUsd: number,
  exchangeRate: number,
  variant: 'submission' | 'page',
): string {
  const label = variant === 'page' ? 'Support only fee' : 'Support only fee (per submission)';
  return `${namedField(label, `${formatDecimal(supportOnlyFeeUsd, 4)} USD`)} × ${namedField('Exchange rate', exchangeRate)}`;
}

export function summaryGbpTooltip(
  summaryUsd: number,
  exchangeRate: number,
  variant: 'submission' | 'page',
): string {
  const label = variant === 'page' ? 'Summary' : 'Summary (per submission)';
  return `${namedField(label, `${formatDecimal(summaryUsd, 4)} USD`)} × ${namedField('Exchange rate', exchangeRate)}`;
}

export type TcoMetric = 'llm' | 'infrastructure' | 'serviceManagement' | 'summary';
export type TcoVariant = 'submission' | 'page';

interface TcoTooltipContext {
  stats: DocumentStatisticsResult;
  llmCalculations: LlmCalculationsResult;
  computeResourcePages: number;
  infrastructureColumnKey: InfrastructureCostColumnKey;
  variant: TcoVariant;
  metric: TcoMetric;
  llmUsd: number;
  infrastructureUsd: number;
  serviceManagementUsd: number;
  exchangeRate: number;
}

function usdTooltipForMetric(ctx: TcoTooltipContext): string {
  const {
    stats,
    llmCalculations,
    variant,
    metric,
    llmUsd,
    infrastructureUsd,
    serviceManagementUsd,
  } = ctx;

  switch (metric) {
    case 'llm':
      return variant === 'submission'
        ? finalCostUsdTooltip(llmCalculations)
        : llmPageUsdTooltip(llmCalculations.finalCostPerSubmissionUsd, stats);
    case 'infrastructure':
      return variant === 'submission'
        ? infrastructureSubmissionUsdTooltip(
            stats,
            ctx.computeResourcePages,
            ctx.infrastructureColumnKey,
          )
        : infrastructurePageUsdTooltip(
            ctx.computeResourcePages,
            ctx.infrastructureColumnKey,
          );
    case 'serviceManagement':
      return variant === 'submission'
        ? serviceManagementSubmissionUsdTooltip()
        : serviceManagementPageUsdTooltip(stats);
    case 'summary':
      return summaryUsdTooltip(llmUsd, infrastructureUsd, serviceManagementUsd, variant);
  }
}

export function tcoUsdTooltip(ctx: TcoTooltipContext): string {
  return usdTooltipForMetric(ctx);
}

export function tcoGbpTooltip(ctx: TcoTooltipContext): string {
  const {
    metric,
    variant,
    exchangeRate,
    llmUsd,
    infrastructureUsd,
    serviceManagementUsd,
  } = ctx;

  if (metric === 'llm') {
    return llmGbpTooltip(llmUsd, exchangeRate, variant);
  }

  if (metric === 'infrastructure') {
    return infrastructureGbpTooltip(infrastructureUsd, exchangeRate, variant);
  }

  if (metric === 'serviceManagement') {
    return supportOnlyFeeGbpTooltip(serviceManagementUsd, exchangeRate, variant);
  }

  if (metric === 'summary') {
    return summaryGbpTooltip(
      llmUsd + infrastructureUsd + serviceManagementUsd,
      exchangeRate,
      variant,
    );
  }

  return gbpTooltip(0, exchangeRate);
}

export function getTcoRowAmounts(
  variant: TcoVariant,
  stats: DocumentStatisticsResult,
  llmCalculations: LlmCalculationsResult,
  computeResourcePages: number,
  infrastructureColumnKey: InfrastructureCostColumnKey,
) {
  const llmUsd =
    variant === 'submission'
      ? llmCalculations.finalCostPerSubmissionUsd
      : stats.pagesPerSubmission > 0
        ? llmCalculations.finalCostPerSubmissionUsd / stats.pagesPerSubmission
        : 0;
  const infrastructureUsd =
    variant === 'submission'
      ? calculateInfrastructurePerSubmissionUsd(
          stats.pagesPerSubmission,
          computeResourcePages,
          infrastructureColumnKey,
        )
      : calculateInfrastructurePerPageUsd(
          computeResourcePages,
          infrastructureColumnKey,
        );
  const serviceManagementUsd =
    variant === 'submission'
      ? serviceManagementPerSubmissionUsd
      : calculateSupportOnlyFeePerPageUsd(
          stats.averageSubmissionsMonthly,
          stats.pagesPerSubmission,
        );

  return { llmUsd, infrastructureUsd, serviceManagementUsd };
}
