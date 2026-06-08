export const mandatoryFieldsPrompts = 20;
export const numberOfOptionalFields = 120;

export interface DocumentStatisticsInputs {
  averageSubmissionsMonthly: number;
  pagesPerSubmission: number;
  groupingFactor: number;
  avgInputTokenPerPrompt: number;
  avgOutputTokensPerPrompt: number;
  avgInputTokenPerPagePdf: number;
}

export const defaultDocumentStatisticsInputs: DocumentStatisticsInputs = {
  averageSubmissionsMonthly: 8000,
  pagesPerSubmission: 60,
  groupingFactor: 4,
  avgInputTokenPerPrompt: 800,
  avgOutputTokensPerPrompt: 600,
  avgInputTokenPerPagePdf: 2500,
};

export interface DocumentStatisticsResult extends DocumentStatisticsInputs {
  averageSubmissionsAnnually: number;
  mandatoryFieldsPrompts: number;
  numberOfOptionalFields: number;
  optionalFieldsPromptsChains: number;
  numberOfPrompts: number;
  inputTokenForCachingPdf: number;
}

export function calculateDocumentStatistics(
  inputs: DocumentStatisticsInputs,
): DocumentStatisticsResult {
  const optionalFieldsPromptsChains =
    numberOfOptionalFields / inputs.groupingFactor;
  const numberOfPrompts = mandatoryFieldsPrompts + optionalFieldsPromptsChains;
  const inputTokenForCachingPdf =
    inputs.pagesPerSubmission * inputs.avgInputTokenPerPagePdf;
  const averageSubmissionsAnnually = inputs.averageSubmissionsMonthly * 12;

  return {
    ...inputs,
    averageSubmissionsAnnually,
    mandatoryFieldsPrompts,
    numberOfOptionalFields,
    optionalFieldsPromptsChains,
    numberOfPrompts,
    inputTokenForCachingPdf,
  };
}
