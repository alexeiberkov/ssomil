import type {
  DocumentStatisticsInputs,
  DocumentStatisticsResult,
} from '../formulas/documentStatistics';
import {
  averageSubmissionsAnnuallyTooltip,
  inputTokenForCachingPdfTooltip,
  numberOfPromptsTooltip,
  optionalFieldsPromptsChainsTooltip,
} from '../formulas/tooltips/documentStatisticsTooltips';
import { CalculatedValue } from './CalculatedValue';

interface DocumentStatisticsTableProps {
  inputs: DocumentStatisticsInputs;
  stats: DocumentStatisticsResult;
  onInputChange: <K extends keyof DocumentStatisticsInputs>(
    key: K,
    value: DocumentStatisticsInputs[K],
  ) => void;
}

function StatInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      className="stats-table__input"
      type="number"
      min="0"
      step="1"
      value={value}
      onChange={(e) => {
        const next = Number(e.target.value);
        if (Number.isFinite(next) && next >= 0) {
          onChange(next);
        }
      }}
    />
  );
}

function StatValue({
  value,
  tooltip,
}: {
  value: number;
  tooltip?: string;
}) {
  const display = Number.isInteger(value) ? value : value.toFixed(2);

  if (!tooltip) {
    return <>{display}</>;
  }

  return <CalculatedValue value={display} tooltip={tooltip} />;
}

export function DocumentStatisticsTable({
  inputs,
  stats,
  onInputChange,
}: DocumentStatisticsTableProps) {
  return (
    <div className="field">
      <span className="field-label">Estimated Statistics per Document (monthly)</span>
      <div className="stats-table-scroll">
        <table className="stats-table">
          <tbody>
            <tr>
              <td className="stats-table__label">Average number of submissions (monthly)</td>
              <td className="stats-table__value">
                <StatInput
                  value={inputs.averageSubmissionsMonthly}
                  onChange={(v) => onInputChange('averageSubmissionsMonthly', v)}
                />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">Average number of submissions (annualy)</td>
              <td className="stats-table__value">
                <StatValue
                  value={stats.averageSubmissionsAnnually}
                  tooltip={averageSubmissionsAnnuallyTooltip(stats)}
                />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">
                <CalculatedValue
                  value="One submission contains aprx. pages"
                  tooltip="This is our assumption"
                />
              </td>
              <td className="stats-table__value">
                <StatInput
                  value={inputs.pagesPerSubmission}
                  onChange={(v) => onInputChange('pagesPerSubmission', v)}
                />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">Mandatory fields prompts</td>
              <td className="stats-table__value">
                <StatValue value={stats.mandatoryFieldsPrompts} />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">Number of Optional fields</td>
              <td className="stats-table__value">
                <StatValue value={stats.numberOfOptionalFields} />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">Grouping factor</td>
              <td className="stats-table__value">
                <StatInput
                  value={inputs.groupingFactor}
                  onChange={(v) => onInputChange('groupingFactor', v)}
                />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">Optional fields prompts (chains)</td>
              <td className="stats-table__value">
                <StatValue
                  value={stats.optionalFieldsPromptsChains}
                  tooltip={optionalFieldsPromptsChainsTooltip(stats)}
                />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">
                <CalculatedValue
                  value="Number of prompts"
                  tooltip="Calculated as each field = one prompt call"
                />
              </td>
              <td className="stats-table__value">
                <StatValue
                  value={stats.numberOfPrompts}
                  tooltip={numberOfPromptsTooltip(stats)}
                />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">Input token for caching PDF</td>
              <td className="stats-table__value">
                <StatValue
                  value={stats.inputTokenForCachingPdf}
                  tooltip={inputTokenForCachingPdfTooltip(stats)}
                />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">
                <CalculatedValue
                  value="Avg input token per prompt"
                  tooltip="Regarding to our real experiment with LIMOSS file"
                />
              </td>
              <td className="stats-table__value">
                <StatInput
                  value={inputs.avgInputTokenPerPrompt}
                  onChange={(v) => onInputChange('avgInputTokenPerPrompt', v)}
                />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">
                <CalculatedValue
                  value="Avg output tokens per prompt"
                  tooltip="Regarding to our real experiment with LIMOSS file"
                />
              </td>
              <td className="stats-table__value">
                <StatInput
                  value={inputs.avgOutputTokensPerPrompt}
                  onChange={(v) => onInputChange('avgOutputTokensPerPrompt', v)}
                />
              </td>
            </tr>
            <tr>
              <td className="stats-table__label">
                <CalculatedValue
                  value="Avg input token for caching 1 page of PDF"
                  tooltip="Regarding to our real experiment with LIMOSS file"
                />
              </td>
              <td className="stats-table__value">
                <StatInput
                  value={inputs.avgInputTokenPerPagePdf}
                  onChange={(v) => onInputChange('avgInputTokenPerPagePdf', v)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
