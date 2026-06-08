/** Monthly support-only fee budget (USD). */
export const supportOnlyFeeMonthlyUsd = 13_000;

/** Support-only fee per submission (USD). */
export const serviceManagementPerSubmissionUsd = 3.73;

export function calculateSupportOnlyFeePerPageUsd(
  averageSubmissionsMonthly: number,
  pagesPerSubmission: number,
): number {
  const monthlyPages = averageSubmissionsMonthly * pagesPerSubmission;
  return monthlyPages > 0 ? supportOnlyFeeMonthlyUsd / monthlyPages : 0;
}
