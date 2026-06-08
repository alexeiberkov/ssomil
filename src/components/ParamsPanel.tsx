import type {
  DocumentStatisticsInputs,
  DocumentStatisticsResult,
} from '../formulas/documentStatistics';
import { calculateLlmCalculations } from '../formulas/llmCalculations';
import { getModelById } from '../prices';
import { DocumentStatisticsTable } from './DocumentStatisticsTable';
import { ExchangeRateField } from './ExchangeRateField';
import { LlmCalculationsTable } from './LlmCalculationsTable';
import { ModelSelector } from './ModelSelector';
import { PdfDocumentField } from './PdfDocumentField';
import { PricingTable } from './PricingTable';

interface ParamsPanelProps {
  modelId: string;
  onModelChange: (modelId: string) => void;
  exchangeRate: number;
  onExchangeRateChange: (value: number) => void;
  documentStatisticsInputs: DocumentStatisticsInputs;
  documentStatistics: DocumentStatisticsResult;
  onDocumentStatisticsInputChange: <K extends keyof DocumentStatisticsInputs>(
    key: K,
    value: DocumentStatisticsInputs[K],
  ) => void;
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="field field--readonly">
      <span className="field-label">{label}</span>
      <p className="field-value">{value}</p>
    </div>
  );
}

export function ParamsPanel({
  modelId,
  onModelChange,
  exchangeRate,
  onExchangeRateChange,
  documentStatisticsInputs,
  documentStatistics,
  onDocumentStatisticsInputChange,
}: ParamsPanelProps) {
  const model = getModelById(modelId);
  const llmCalculations = calculateLlmCalculations(
    documentStatistics,
    model.prices,
    exchangeRate,
  );

  return (
    <section className="panel params-panel">
      <h2>Params</h2>
      <div className="params-fields">
        <ExchangeRateField value={exchangeRate} onChange={onExchangeRateChange} />
        <ReadOnlyField label="File name" value="ACO0000877018.pdf" />
        <PdfDocumentField />
        <ModelSelector value={modelId} onChange={onModelChange} />
        <PricingTable prices={model.prices} />
        <DocumentStatisticsTable
          inputs={documentStatisticsInputs}
          stats={documentStatistics}
          onInputChange={onDocumentStatisticsInputChange}
        />
        <LlmCalculationsTable
          stats={documentStatistics}
          prices={model.prices}
          exchangeRate={exchangeRate}
          calculations={llmCalculations}
        />
      </div>
    </section>
  );
}
