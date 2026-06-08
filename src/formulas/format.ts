export function formatGrouped(n: number): string {
  return Math.round(n).toLocaleString('en-US').replace(/,/g, ' ');
}

export function formatDecimal(n: number, decimals = 2): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).replace(/,/g, ' ');
}

export function formatDecimalTrimmed(n: number, maxDecimals = 10): string {
  const trimmed = n.toFixed(maxDecimals).replace(/\.?0+$/, '');
  if (!trimmed.includes('.')) {
    return formatGrouped(Number(trimmed));
  }
  const [intPart, decPart] = trimmed.split('.');
  const groupedInt = Number(intPart).toLocaleString('en-US').replace(/,/g, ' ');
  return `${groupedInt}.${decPart}`;
}

export function formatDisplayValue(value: number): string {
  return Number.isInteger(value) ? formatGrouped(value) : formatDecimal(value, 2);
}

export function formatUsd(value: number, decimals = 2): string {
  return `$${formatDecimal(value, decimals)}`;
}

export function formatGbp(value: number, decimals = 2): string {
  return `£${formatDecimal(value, decimals)}`;
}

/** Field name with value for tooltip formulas, e.g. "Number of prompts (50)". */
export function namedField(name: string, value: string | number): string {
  return `${name} (${value})`;
}
