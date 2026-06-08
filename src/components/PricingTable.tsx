import {
  formatDecimalTrimmed,
  formatUsd as formatUsdAmount,
} from '../formulas/format';
import {
  perMillionUsdTooltip,
  perTokenUsdTooltip,
} from '../formulas/tooltips/pricingTooltips';
import { pricingTableRows } from '../prices/pricingTableRows';
import type { TokenPrices } from '../prices/types';
import { CalculatedValue } from './CalculatedValue';

const MILLION = 1_000_000;

function formatUsdPerMillion(value: number): string {
  return formatUsdAmount(value);
}

function formatUsdPerToken(valuePerMillion: number): string {
  return `$${formatDecimalTrimmed(valuePerMillion / MILLION)}`;
}

interface PricingTableProps {
  prices: TokenPrices;
}

export function PricingTable({ prices }: PricingTableProps) {
  return (
    <div className="field field--readonly">
      <span className="field-label">Pricing</span>
      <div className="pricing-table-scroll">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Pricing</th>
              <th>For 1 token (USD)</th>
              <th>For 1 million tokens (USD)</th>
            </tr>
          </thead>
          <tbody>
            {pricingTableRows.map((row) => {
              const perMillion = prices[row.key];
              return (
                <tr key={row.key}>
                  <td className="pricing-table__label">{row.label}</td>
                  <td className="pricing-table__value">
                    <CalculatedValue
                      value={formatUsdPerToken(perMillion)}
                      tooltip={perTokenUsdTooltip(row.label, perMillion)}
                    />
                  </td>
                  <td className="pricing-table__value">
                    <CalculatedValue
                      value={formatUsdPerMillion(perMillion)}
                      tooltip={perMillionUsdTooltip(row.label, perMillion)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
