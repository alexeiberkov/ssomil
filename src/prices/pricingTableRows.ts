import type { TokenPrices } from './types';

export interface PricingTableRow {
  label: string;
  key: keyof Pick<
    TokenPrices,
    'baseInputTokens' | 'cacheWrites5m' | 'outputTokens' | 'cacheHitsRefreshes'
  >;
}

export const pricingTableRows: PricingTableRow[] = [
  { label: 'Input Cost Per Token', key: 'baseInputTokens' },
  { label: 'Input Caching Cost per token', key: 'cacheWrites5m' },
  { label: 'Output Cost Per Token', key: 'outputTokens' },
  { label: 'Output Caching Cost Per Token', key: 'cacheHitsRefreshes' },
];
