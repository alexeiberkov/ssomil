import type { TokenPrices } from '../prices/types';
import { toGbp } from './exchangeRate';
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

function makeAmount(usd: number): CurrencyAmount {
  return { usd, gbp: toGbp(usd) };
}

function buildRow(
  llmUsd: number,
  infrastructureUsd: number,
  serviceManagementUsd: number,
): TcoRow {
  const summaryUsd = llmUsd + infrastructureUsd + serviceManagementUsd;
  return {
    llm: makeAmount(llmUsd),
    infrastructure: makeAmount(infrastructureUsd),
    serviceManagement: makeAmount(serviceManagementUsd),
    summary: makeAmount(summaryUsd),
  };
}

export function calculateTco(prices: TokenPrices): TcoResult {
  return {
    perSubmission: buildRow(
      calculateLlmCostUsd(prices),
      infrastructurePerSubmissionUsd,
      serviceManagementPerSubmissionUsd,
    ),
    perPage: buildRow(
      calculateLlmCostPerPageUsd(prices),
      infrastructurePerPageUsd,
      serviceManagementPerPageUsd,
    ),
  };
}
