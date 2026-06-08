import {
  getInfrastructureCostColumnLabel,
  infrastructureCostRows,
  type InfrastructureCostColumnKey,
  type InfrastructureCostRow,
} from '../../content/infrastructureCost';
import { formatGrouped, formatUsd, namedField } from '../format';

export function infrastructureCostTotalTooltip(
  columnKey: InfrastructureCostColumnKey,
  rows: InfrastructureCostRow[] = infrastructureCostRows,
): string {
  return rows
    .map((row) => namedField(row.service, formatUsd(row[columnKey])))
    .join(' + ');
}

export function avgInfrastructureCostPerPageTooltip(
  columnKey: InfrastructureCostColumnKey,
  totalValue: number,
  computeResourcePages: number,
): string {
  const totalLabel = `${getInfrastructureCostColumnLabel(columnKey)} Total Price`;

  if (columnKey === 'combinedSavingPlan') {
    const pages = namedField('Compute resource pages', formatGrouped(computeResourcePages));
    return `${namedField(totalLabel, formatUsd(totalValue))} / (${pages} + 10% × ${pages})`;
  }

  return `${namedField(totalLabel, formatUsd(totalValue))} / ${namedField('Compute resource pages', formatGrouped(computeResourcePages))}`;
}
