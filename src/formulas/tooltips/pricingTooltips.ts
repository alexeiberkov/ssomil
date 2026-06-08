import { formatDecimal, formatGrouped, namedField } from '../format';

const MILLION = 1_000_000;

export function perTokenUsdTooltip(fieldName: string, usdPerMillion: number): string {
  return `${namedField(`For 1 million tokens (${fieldName})`, `${formatDecimal(usdPerMillion)} USD`)} / ${formatGrouped(MILLION)}`;
}

export function perMillionUsdTooltip(fieldName: string, usdPerMillion: number): string {
  return `Model price for ${namedField(fieldName, `${formatDecimal(usdPerMillion)} USD`)} per ${formatGrouped(MILLION)} tokens`;
}
