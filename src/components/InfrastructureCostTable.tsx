import { useMemo } from 'react';
import {
  calculateAvgInfrastructureCostPerPage,
  calculateInfrastructureCostTotal,
  infrastructureCostColumns,
  infrastructureCostIntro,
  infrastructureCostRows,
  type InfrastructureCostColumnKey,
  type InfrastructureCostRow,
} from '../content/infrastructureCost';
import { formatUsd } from '../formulas/format';
import {
  avgInfrastructureCostPerPageTooltip,
  infrastructureCostTotalTooltip,
} from '../formulas/tooltips/infrastructureCostTooltips';
import { CalculatedValue } from './CalculatedValue';

function CostCell({ value, highlight }: { value: number; highlight?: boolean }) {
  return (
    <td className={highlight ? 'infra-table__cell--highlight' : undefined}>
      {formatUsd(value)}
    </td>
  );
}

function TotalCostCell({
  value,
  columnKey,
  highlight,
}: {
  value: number;
  columnKey: InfrastructureCostColumnKey;
  highlight?: boolean;
}) {
  return (
    <td className={highlight ? 'infra-table__cell--highlight' : undefined}>
      <CalculatedValue
        value={formatUsd(value)}
        tooltip={infrastructureCostTotalTooltip(columnKey)}
      />
    </td>
  );
}

function AvgCostCell({
  value,
  columnKey,
  totalValue,
  computeResourcePages,
  highlight,
}: {
  value: number;
  columnKey: InfrastructureCostColumnKey;
  totalValue: number;
  computeResourcePages: number;
  highlight?: boolean;
}) {
  return (
    <td className={highlight ? 'infra-table__cell--highlight' : undefined}>
      <CalculatedValue
        value={formatUsd(value, 4)}
        tooltip={avgInfrastructureCostPerPageTooltip(
          columnKey,
          totalValue,
          computeResourcePages,
        )}
      />
    </td>
  );
}

function DataRow({
  row,
  selectedColumnKey,
}: {
  row: InfrastructureCostRow;
  selectedColumnKey: InfrastructureCostColumnKey;
}) {
  return (
    <tr>
      <td className="infra-table__service">{row.service}</td>
      {infrastructureCostColumns.map((col) => (
        <CostCell
          key={col.key}
          value={row[col.key]}
          highlight={selectedColumnKey === col.key}
        />
      ))}
    </tr>
  );
}

interface InfrastructureCostTableProps {
  computeResourcePages: number;
  onComputeResourcePagesChange: (value: number) => void;
  selectedColumnKey: InfrastructureCostColumnKey;
  onSelectedColumnKeyChange: (columnKey: InfrastructureCostColumnKey) => void;
}

export function InfrastructureCostTable({
  computeResourcePages,
  onComputeResourcePagesChange,
  selectedColumnKey,
  onSelectedColumnKeyChange,
}: InfrastructureCostTableProps) {
  const total = useMemo(() => calculateInfrastructureCostTotal(), []);

  const avgPerPage = useMemo(
    () => calculateAvgInfrastructureCostPerPage(computeResourcePages),
    [computeResourcePages],
  );

  return (
    <section className="panel infra-panel">
      <h2>Infrastructure Cost (price)</h2>
      <div className="infra-table-note">
        <span>{infrastructureCostIntro}</span>
        <label className="infra-compute-pages" htmlFor="compute-resource-pages">
          <span className="infra-compute-pages__label">Compute resource pages</span>
          <input
            id="compute-resource-pages"
            className="infra-compute-pages__input"
            type="number"
            min="1"
            step="1"
            value={computeResourcePages}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isFinite(next) && next > 0) {
                onComputeResourcePagesChange(next);
              }
            }}
          />
        </label>
      </div>
      <div className="infra-table-scroll">
        <table className="infra-table">
          <thead>
            <tr>
              <th className="infra-table__header-service">AZURE services</th>
              {infrastructureCostColumns.map((col) => (
                <th
                  key={col.key}
                  className={
                    selectedColumnKey === col.key
                      ? 'infra-table__header--selected'
                      : undefined
                  }
                >
                  <label className="infra-table__header-label">
                    <input
                      type="radio"
                      name="infra-cost-column"
                      className="infra-table__header-radio"
                      checked={selectedColumnKey === col.key}
                      onChange={() => onSelectedColumnKeyChange(col.key)}
                    />
                    <span>{col.label}</span>
                  </label>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {infrastructureCostRows.map((row) => (
              <DataRow
                key={row.service}
                row={row}
                selectedColumnKey={selectedColumnKey}
              />
            ))}
            <tr className="infra-table__total-row">
              <td className="infra-table__service">{total.service}</td>
              {infrastructureCostColumns.map((col) => (
                <TotalCostCell
                  key={col.key}
                  value={total[col.key]}
                  columnKey={col.key}
                  highlight={selectedColumnKey === col.key}
                />
              ))}
            </tr>
            <tr className="infra-table__avg-row">
              <td className="infra-table__service">{avgPerPage.service}</td>
              {infrastructureCostColumns.map((col) => (
                <AvgCostCell
                  key={col.key}
                  value={avgPerPage[col.key]}
                  columnKey={col.key}
                  totalValue={total[col.key]}
                  computeResourcePages={computeResourcePages}
                  highlight={selectedColumnKey === col.key}
                />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
