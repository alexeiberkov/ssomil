import type { DocumentStatisticsResult } from '../formulas/documentStatistics';
import type { LlmCalculationsResult } from '../formulas/llmCalculations';
import {
  avgInputPromptsCostTooltip,
  avgOutputPromptsCostTooltip,
  finalCostGbpTooltip,
  finalCostUsdTooltip,
  monthlyOcrLlmCostsGbpTooltip,
  monthlyOcrLlmCostsUsdTooltip,
  pdfCacheReadCostTooltip,
  pdfCachingCostTooltip,
} from '../formulas/tooltips/llmCalculationsTooltips';
import type { TokenPrices } from '../prices/types';
import { CalculatedValue } from './CalculatedValue';

interface LlmCalculationsTableProps {
  stats: DocumentStatisticsResult;
  prices: TokenPrices;
  exchangeRate: number;
  calculations: LlmCalculationsResult;
}

function formatUsd(value: number): string {
  return `$${value.toFixed(2)}`;
}

function formatGbp(value: number): string {
  return `£${value.toFixed(2)}`;
}

function CalcRow({
  label,
  value,
  tooltip,
}: {
  label: string;
  value: string;
  tooltip: string;
}) {
  return (
    <tr>
      <td className="stats-table__label">{label}</td>
      <td className="stats-table__value">
        <CalculatedValue value={value} tooltip={tooltip} />
      </td>
    </tr>
  );
}

export function LlmCalculationsTable({
  stats,
  prices,
  exchangeRate,
  calculations,
}: LlmCalculationsTableProps) {
  return (
    <div className="field field--readonly">
      <span className="field-label">LLM Calculations</span>
      <div className="stats-table-scroll">
        <table className="stats-table">
          <tbody>
            <CalcRow
              label="Avarage cost for all input of prompts"
              value={formatUsd(calculations.avgInputPromptsCostUsd)}
              tooltip={avgInputPromptsCostTooltip(stats, prices)}
            />
            <CalcRow
              label="Avarage cost for all output of prompts"
              value={formatUsd(calculations.avgOutputPromptsCostUsd)}
              tooltip={avgOutputPromptsCostTooltip(stats, prices)}
            />
            <CalcRow
              label="Cost for caching the PDF one time"
              value={formatUsd(calculations.pdfCachingCostUsd)}
              tooltip={pdfCachingCostTooltip(stats, prices)}
            />
            <CalcRow
              label="Cost for reading PDF from cache"
              value={formatUsd(calculations.pdfCacheReadCostUsd)}
              tooltip={pdfCacheReadCostTooltip(stats, prices)}
            />
            <CalcRow
              label="Final cost per submission ($)"
              value={formatUsd(calculations.finalCostPerSubmissionUsd)}
              tooltip={finalCostUsdTooltip(calculations)}
            />
            <CalcRow
              label="Final cost per submission (£)"
              value={formatGbp(calculations.finalCostPerSubmissionGbp)}
              tooltip={finalCostGbpTooltip(calculations, exchangeRate)}
            />
            <CalcRow
              label="Monthly OCR & LLM costs ($)"
              value={formatUsd(calculations.monthlyOcrLlmCostsUsd)}
              tooltip={monthlyOcrLlmCostsUsdTooltip(stats, calculations)}
            />
            <CalcRow
              label="Monthly OCR & LLM costs (£)"
              value={formatGbp(calculations.monthlyOcrLlmCostsGbp)}
              tooltip={monthlyOcrLlmCostsGbpTooltip(calculations, exchangeRate)}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
