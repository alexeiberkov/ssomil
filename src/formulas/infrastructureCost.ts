import {
  calculateAvgInfrastructureCostPerPage,
  defaultComputeResourcePages,
} from '../content/infrastructureCost';

export function calculateInfrastructurePerPageUsd(
  computeResourcePages: number = defaultComputeResourcePages,
): number {
  return calculateAvgInfrastructureCostPerPage(computeResourcePages).prodSavingPlan;
}

export function calculateInfrastructurePerSubmissionUsd(
  pagesPerSubmission: number,
  computeResourcePages: number = defaultComputeResourcePages,
): number {
  return calculateInfrastructurePerPageUsd(computeResourcePages) * pagesPerSubmission;
}
