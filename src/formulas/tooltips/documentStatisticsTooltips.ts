import type { DocumentStatisticsResult } from '../documentStatistics';
import { mandatoryFieldsPrompts, numberOfOptionalFields } from '../documentStatistics';
import { formatGrouped, namedField } from '../format';

export function averageSubmissionsAnnuallyTooltip(stats: DocumentStatisticsResult): string {
  return `${namedField('Average number of submissions (monthly)', formatGrouped(stats.averageSubmissionsMonthly))} × 12`;
}

export function optionalFieldsPromptsChainsTooltip(stats: DocumentStatisticsResult): string {
  return `${namedField('Number of Optional fields', formatGrouped(numberOfOptionalFields))} / ${namedField('Grouping factor', stats.groupingFactor)}`;
}

export function numberOfPromptsTooltip(stats: DocumentStatisticsResult): string {
  return `${namedField('Mandatory fields prompts', mandatoryFieldsPrompts)} + ${namedField('Optional fields prompts (chains)', stats.optionalFieldsPromptsChains)}`;
}

export function inputTokenForCachingPdfTooltip(stats: DocumentStatisticsResult): string {
  return `${namedField('One submission contains aprx. pages', stats.pagesPerSubmission)} × ${namedField('Avg input token for caching 1 page of PDF', formatGrouped(stats.avgInputTokenPerPagePdf))}`;
}
