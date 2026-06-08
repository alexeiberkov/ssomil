import {
  calculateAvgInfrastructureCostPerPage,
  type InfrastructureCostColumnKey,
} from '../content/infrastructureCost';

export function calculateInfrastructurePerPageUsd(
  computeResourcePages: number,
  columnKey: InfrastructureCostColumnKey,
): number {
  return calculateAvgInfrastructureCostPerPage(computeResourcePages)[columnKey];
}

export function calculateInfrastructurePerSubmissionUsd(
  pagesPerSubmission: number,
  computeResourcePages: number,
  columnKey: InfrastructureCostColumnKey,
): number {
  return (
    calculateInfrastructurePerPageUsd(computeResourcePages, columnKey) *
    pagesPerSubmission
  );
}
