export function formatGrouped(n: number): string {
  return Math.round(n).toLocaleString('en-US').replace(/,/g, ' ');
}

export function formatDecimal(n: number, decimals = 2): string {
  return n.toFixed(decimals);
}

export function formatDecimalTrimmed(n: number, maxDecimals = 10): string {
  return n.toFixed(maxDecimals).replace(/\.?0+$/, '');
}

/** Field name with value for tooltip formulas, e.g. "Number of prompts (50)". */
export function namedField(name: string, value: string | number): string {
  return `${name} (${value})`;
}
