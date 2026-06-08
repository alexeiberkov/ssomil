/** USD → GBP conversion rate. */
export const usdToGbp = 0.76;

export function toGbp(usd: number): number {
  return usd * usdToGbp;
}
