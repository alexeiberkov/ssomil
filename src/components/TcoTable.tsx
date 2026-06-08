import type { CurrencyAmount, TcoResult, TcoRow } from '../formulas/tco';
import type { InfrastructureCostColumnKey } from '../content/infrastructureCost';
import type { DocumentStatisticsResult } from '../formulas/documentStatistics';
import { formatDecimal } from '../formulas/format';
import type { LlmCalculationsResult } from '../formulas/llmCalculations';
import {
  getTcoRowAmounts,
  tcoGbpTooltip,
  tcoUsdTooltip,
  type TcoMetric,
  type TcoVariant,
} from '../formulas/tooltips/tcoTooltips';
import { CalculatedValue } from './CalculatedValue';

interface TcoTableProps {
  tco: TcoResult;
  stats: DocumentStatisticsResult;
  llmCalculations: LlmCalculationsResult;
  computeResourcePages: number;
  infrastructureColumnKey: InfrastructureCostColumnKey;
  exchangeRate: number;
}

interface TcoColumn {
  key: TcoMetric;
  label: string;
}

function formatCurrency(value: number): string {
  return formatDecimal(value, 4);
}

function CurrencyValue({
  symbol,
  value,
  tooltip,
}: {
  symbol: string;
  value: number;
  tooltip: string;
}) {
  return (
    <CalculatedValue
      className="currency-value-pair"
      tooltip={tooltip}
      value={
        <>
          <span className="currency-symbol">{symbol}</span>
          <span className="currency-value">{formatCurrency(value)}</span>
        </>
      }
    />
  );
}

function TcoBlock({
  title,
  columns,
  row,
  variant,
  stats,
  llmCalculations,
  computeResourcePages,
  infrastructureColumnKey,
  exchangeRate,
}: {
  title: string;
  columns: TcoColumn[];
  row: TcoRow;
  variant: TcoVariant;
  stats: DocumentStatisticsResult;
  llmCalculations: LlmCalculationsResult;
  computeResourcePages: number;
  infrastructureColumnKey: InfrastructureCostColumnKey;
  exchangeRate: number;
}) {
  const amounts = getTcoRowAmounts(
    variant,
    stats,
    llmCalculations,
    computeResourcePages,
    infrastructureColumnKey,
  );

  const tooltipContext = {
    stats,
    llmCalculations,
    computeResourcePages,
    infrastructureColumnKey,
    variant,
    exchangeRate,
    ...amounts,
  };

  const tooltipFor = (metric: TcoMetric, currency: 'usd' | 'gbp') => {
    if (currency === 'usd') {
      return tcoUsdTooltip({ ...tooltipContext, metric });
    }
    return tcoGbpTooltip({ ...tooltipContext, metric });
  };

  return (
    <div className={`tco-block tco-block--${variant}`}>
      <h3 className="tco-block__title">{title}</h3>
      <div className="tco-table-scroll">
        <table className="tco-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {columns.map((col) => (
                <td key={col.key} className="currency-cell">
                  <CurrencyValue
                    symbol="$"
                    value={row[col.key].usd}
                    tooltip={tooltipFor(col.key, 'usd')}
                  />
                </td>
              ))}
            </tr>
            <tr>
              {columns.map((col) => (
                <td key={col.key} className="currency-cell">
                  <CurrencyValue
                    symbol="£"
                    value={row[col.key].gbp}
                    tooltip={tooltipFor(col.key, 'gbp')}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="tco-cards">
        {columns.map((col) => {
          const amount: CurrencyAmount = row[col.key];
          return (
            <div key={col.key} className="tco-card">
              <div className="tco-card__label">{col.label}</div>
              <div className="tco-card__values">
                <CurrencyValue
                  symbol="$"
                  value={amount.usd}
                  tooltip={tooltipFor(col.key, 'usd')}
                />
                <CurrencyValue
                  symbol="£"
                  value={amount.gbp}
                  tooltip={tooltipFor(col.key, 'gbp')}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const submissionColumns: TcoColumn[] = [
  { key: 'llm', label: 'LLM costs' },
  { key: 'infrastructure', label: 'Infrastructure Costs' },
  { key: 'serviceManagement', label: 'Support only fee' },
  { key: 'summary', label: 'Summary' },
];

const pageColumns: TcoColumn[] = [
  { key: 'llm', label: 'LLM cost' },
  { key: 'infrastructure', label: 'Infrastructure Costs' },
  { key: 'serviceManagement', label: 'Support only fee' },
  { key: 'summary', label: 'Summary' },
];

export function TcoTable({
  tco,
  stats,
  llmCalculations,
  computeResourcePages,
  infrastructureColumnKey,
  exchangeRate,
}: TcoTableProps) {
  return (
    <section className="panel tco-panel">
      <h2>TCO</h2>
      <div className="tco-tables">
        <TcoBlock
          title="Per submission"
          columns={submissionColumns}
          row={tco.perSubmission}
          variant="submission"
          stats={stats}
          llmCalculations={llmCalculations}
          computeResourcePages={computeResourcePages}
          infrastructureColumnKey={infrastructureColumnKey}
          exchangeRate={exchangeRate}
        />
        <TcoBlock
          title="Per page"
          columns={pageColumns}
          row={tco.perPage}
          variant="page"
          stats={stats}
          llmCalculations={llmCalculations}
          computeResourcePages={computeResourcePages}
          infrastructureColumnKey={infrastructureColumnKey}
          exchangeRate={exchangeRate}
        />
      </div>
    </section>
  );
}
