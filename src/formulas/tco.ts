import type { TokenPrices } from '../prices/types';
import type { InfrastructureCostColumnKey } from '../content/infrastructureCost';
import type { DocumentStatisticsResult } from './documentStatistics';
import { usdToGbp, toGbp } from './exchangeRate';
import {
  calculateInfrastructurePerPageUsd,
  calculateInfrastructurePerSubmissionUsd,
} from './infrastructureCost';
import { calculateLlmCalculations } from './llmCalculations';
import {
  calculateSupportOnlyFeePerPageUsd,
  serviceManagementPerSubmissionUsd,
} from './serviceManagementCost';

export interface CurrencyAmount {
  usd: number;
  gbp: number;
}

export interface TcoRow {
  llm: CurrencyAmount;
  infrastructure: CurrencyAmount;
  serviceManagement: CurrencyAmount;
  summary: CurrencyAmount;
}

export interface TcoResult {
  perSubmission: TcoRow;
  perPage: TcoRow;
}

function buildRow(
  llmUsd: number,
  infrastructureUsd: number,
  serviceManagementUsd: number,
  exchangeRate: number,
): TcoRow {
  const makeAmount = (usd: number): CurrencyAmount => ({
    usd,
    gbp: toGbp(usd, exchangeRate),
  });
  const summaryUsd = llmUsd + infrastructureUsd + serviceManagementUsd;
  return {
    llm: makeAmount(llmUsd),
    infrastructure: makeAmount(infrastructureUsd),
    serviceManagement: makeAmount(serviceManagementUsd),
    summary: makeAmount(summaryUsd),
  };
}

export function calculateTco(
  stats: DocumentStatisticsResult,
  prices: TokenPrices,
  exchangeRate: number = usdToGbp,
  computeResourcePages: number,
  infrastructureColumnKey: InfrastructureCostColumnKey,
): TcoResult {
  const llm = calculateLlmCalculations(stats, prices, exchangeRate);
  const llmPerSubmissionUsd = llm.finalCostPerSubmissionUsd;
  const llmPerPageUsd =
    stats.pagesPerSubmission > 0
      ? llmPerSubmissionUsd / stats.pagesPerSubmission
      : 0;

  const infrastructurePerPageUsd = calculateInfrastructurePerPageUsd(
    computeResourcePages,
    infrastructureColumnKey,
  );
  const infrastructurePerSubmissionUsd = calculateInfrastructurePerSubmissionUsd(
    stats.pagesPerSubmission,
    computeResourcePages,
    infrastructureColumnKey,
  );

  const supportOnlyFeePerPageUsd = calculateSupportOnlyFeePerPageUsd(
    stats.averageSubmissionsMonthly,
    stats.pagesPerSubmission,
  );

  return {
    perSubmission: buildRow(
      llmPerSubmissionUsd,
      infrastructurePerSubmissionUsd,
      serviceManagementPerSubmissionUsd,
      exchangeRate,
    ),
    perPage: buildRow(
      llmPerPageUsd,
      infrastructurePerPageUsd,
      supportOnlyFeePerPageUsd,
      exchangeRate,
    ),
  };
}
