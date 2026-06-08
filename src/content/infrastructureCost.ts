export const infrastructureCostIntro = 'Minimal cost of infrastructure.';

export const defaultComputeResourcePages = 425_000;

/** 10% buffer on compute resource pages for combined Prod+Dev avg per page. */
export const combinedSavingPlanPagesBufferRatio = 0.1;

export interface InfrastructureCostRow {
  service: string;
  prodNoSaving: number;
  prodSavingPlan: number;
  devNoSaving: number;
  devSavingPlan: number;
  combinedSavingPlan: number;
}

export type InfrastructureCostColumnKey = keyof Omit<InfrastructureCostRow, 'service'>;

export const defaultInfrastructureCostColumnKey: InfrastructureCostColumnKey =
  'prodSavingPlan';

export function getInfrastructureCostColumnLabel(
  columnKey: InfrastructureCostColumnKey,
): string {
  return (
    infrastructureCostColumns.find((column) => column.key === columnKey)?.label ??
    columnKey
  );
}

export const infrastructureCostRows: InfrastructureCostRow[] = [
  {
    service: 'Azure Kubernetes Service (AKS 2 nodes)',
    prodNoSaving: 73.0,
    prodSavingPlan: 73.0,
    devNoSaving: 73.0,
    devSavingPlan: 73.0,
    combinedSavingPlan: 146.0,
  },
  {
    service: 'AKS Nodes (2 nodes)',
    prodNoSaving: 648.0,
    prodSavingPlan: 340.0,
    devNoSaving: 648.0,
    devSavingPlan: 340.0,
    combinedSavingPlan: 680.0,
  },
  {
    service: 'Application Gateway',
    prodNoSaving: 188.0,
    prodSavingPlan: 188.0,
    devNoSaving: 188.0,
    devSavingPlan: 188.0,
    combinedSavingPlan: 376.0,
  },
  {
    service: 'Azure Container Registry',
    prodNoSaving: 20.0,
    prodSavingPlan: 20.0,
    devNoSaving: 20.0,
    devSavingPlan: 20.0,
    combinedSavingPlan: 40.0,
  },
  {
    service: 'Azure Database for PostgreSQL',
    prodNoSaving: 294.0,
    prodSavingPlan: 121.0,
    devNoSaving: 294.0,
    devSavingPlan: 121.0,
    combinedSavingPlan: 242.0,
  },
  {
    service: 'Storage Accounts',
    prodNoSaving: 20.43,
    prodSavingPlan: 20.43,
    devNoSaving: 20.43,
    devSavingPlan: 20.43,
    combinedSavingPlan: 40.86,
  },
  {
    service: 'Service Bus',
    prodNoSaving: 9.81,
    prodSavingPlan: 9.81,
    devNoSaving: 9.81,
    devSavingPlan: 9.81,
    combinedSavingPlan: 19.62,
  },
  {
    service: 'Azure Monitor',
    prodNoSaving: 72.0,
    prodSavingPlan: 72.0,
    devNoSaving: 72.0,
    devSavingPlan: 72.0,
    combinedSavingPlan: 144.0,
  },
];

export const infrastructureCostColumns = [
  { key: 'prodNoSaving' as const, label: '[Prod] Cost per month (no saving)' },
  { key: 'prodSavingPlan' as const, label: '[Prod] Cost per month (Saving plan)' },
  { key: 'devNoSaving' as const, label: '[Dev/QA/UAT] Cost per month (no saving)' },
  { key: 'devSavingPlan' as const, label: '[Dev/QA/UAT] Cost per month (Saving plan)' },
  {
    key: 'combinedSavingPlan' as const,
    label: '[Prod]+[Dev/QA/UAT] Cost per month (Saving plan)',
  },
];

export function calculateInfrastructureCostTotal(
  rows: InfrastructureCostRow[] = infrastructureCostRows,
): InfrastructureCostRow {
  return rows.reduce<InfrastructureCostRow>(
    (total, row) => ({
      service: 'Total Price',
      prodNoSaving: total.prodNoSaving + row.prodNoSaving,
      prodSavingPlan: total.prodSavingPlan + row.prodSavingPlan,
      devNoSaving: total.devNoSaving + row.devNoSaving,
      devSavingPlan: total.devSavingPlan + row.devSavingPlan,
      combinedSavingPlan: total.combinedSavingPlan + row.combinedSavingPlan,
    }),
    {
      service: 'Total Price',
      prodNoSaving: 0,
      prodSavingPlan: 0,
      devNoSaving: 0,
      devSavingPlan: 0,
      combinedSavingPlan: 0,
    },
  );
}

export function calculateAvgInfrastructureCostPerPage(
  computeResourcePages: number,
  rows: InfrastructureCostRow[] = infrastructureCostRows,
): InfrastructureCostRow {
  const total = calculateInfrastructureCostTotal(rows);
  const perPage = (value: number, pages: number) =>
    pages > 0 ? value / pages : 0;

  return {
    service: 'Avg Infrastructure Costs per page',
    prodNoSaving: perPage(total.prodNoSaving, computeResourcePages),
    prodSavingPlan: perPage(total.prodSavingPlan, computeResourcePages),
    devNoSaving: perPage(total.devNoSaving, computeResourcePages),
    devSavingPlan: perPage(total.devSavingPlan, computeResourcePages),
    combinedSavingPlan: perPage(
      total.combinedSavingPlan,
      computeResourcePages * (1 + combinedSavingPlanPagesBufferRatio),
    ),
  };
}
