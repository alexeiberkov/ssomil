import type { TokenPrices } from '../prices/types';
import { usdToGbp, toGbp } from './exchangeRate';
import {
  infrastructurePerPageUsd,
  infrastructurePerSubmissionUsd,
} from './infrastructureCost';
import {
  calculateLlmCostPerPageUsd,
  calculateLlmCostUsd,
} from './llmCost';
import {
  serviceManagementPerPageUsd,
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
  prices: TokenPrices,
  exchangeRate: number = usdToGbp,
): TcoResult {
  return {
    perSubmission: buildRow(
      calculateLlmCostUsd(prices),
      infrastructurePerSubmissionUsd,
      serviceManagementPerSubmissionUsd,
      exchangeRate,
    ),
    perPage: buildRow(
      calculateLlmCostPerPageUsd(prices),
      infrastructurePerPageUsd,
      serviceManagementPerPageUsd,
      exchangeRate,
    ),
  };
}
