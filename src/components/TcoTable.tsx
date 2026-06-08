import type { CurrencyAmount, TcoResult, TcoRow } from '../formulas/tco';
import {
  getTcoRowAmounts,
  tcoGbpTooltip,
  tcoUsdTooltip,
  type TcoMetric,
  type TcoVariant,
} from '../formulas/tooltips/tcoTooltips';
import type { TokenPrices } from '../prices/types';
import { CalculatedValue } from './CalculatedValue';

interface TcoTableProps {
  tco: TcoResult;
  prices: TokenPrices;
  exchangeRate: number;
}

interface TcoColumn {
  key: TcoMetric;
  label: string;
}

function formatCurrency(value: number): string {
  return value.toFixed(4);
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
  columns,
  row,
  variant,
  prices,
  exchangeRate,
}: {
  columns: TcoColumn[];
  row: TcoRow;
  variant: TcoVariant;
  prices: TokenPrices;
  exchangeRate: number;
}) {
  const amounts = getTcoRowAmounts(variant, prices);

  const tooltipContext = {
    prices,
    variant,
    ...amounts,
  };

  const tooltipFor = (metric: TcoMetric, currency: 'usd' | 'gbp') => {
    const amount = row[metric];
    if (currency === 'usd') {
      return tcoUsdTooltip({ ...tooltipContext, metric });
    }
    return tcoGbpTooltip(amount.usd, exchangeRate);
  };

  return (
    <div className={`tco-block tco-block--${variant}`}>
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
  { key: 'llm', label: 'LLM costs (per submission)' },
  { key: 'infrastructure', label: 'Infrastructure Costs (per submission)' },
  { key: 'serviceManagement', label: 'Service management and CR fee (per submission)' },
  { key: 'summary', label: 'Summary (per submission)' },
];

const pageColumns: TcoColumn[] = [
  { key: 'llm', label: 'LLM cost (per page)' },
  { key: 'infrastructure', label: 'Infrastructure Costs (per page)' },
  { key: 'serviceManagement', label: 'Service management and CR fee (per page)' },
  { key: 'summary', label: 'Summary (per page)' },
];

export function TcoTable({ tco, prices, exchangeRate }: TcoTableProps) {
  return (
    <section className="panel tco-panel">
      <h2>TCO</h2>
      <div className="tco-tables">
        <TcoBlock
          columns={submissionColumns}
          row={tco.perSubmission}
          variant="submission"
          prices={prices}
          exchangeRate={exchangeRate}
        />
        <TcoBlock
          columns={pageColumns}
          row={tco.perPage}
          variant="page"
          prices={prices}
          exchangeRate={exchangeRate}
        />
      </div>
    </section>
  );
}
