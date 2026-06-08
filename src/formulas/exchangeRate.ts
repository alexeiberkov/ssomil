/** Default USD → GBP conversion rate. */
export const usdToGbp = 0.76;

export function toGbp(usd: number, rate: number = usdToGbp): number {
  return usd * rate;
}
