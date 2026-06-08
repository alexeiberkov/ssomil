import { useMemo, useState } from 'react';
import { InfrastructureCostTable } from './components/InfrastructureCostTable';
import { ParamsPanel } from './components/ParamsPanel';
import { TcoTable } from './components/TcoTable';
import {
  calculateDocumentStatistics,
  defaultDocumentStatisticsInputs,
  type DocumentStatisticsInputs,
} from './formulas/documentStatistics';
import { usdToGbp } from './formulas/exchangeRate';
import { calculateLlmCalculations } from './formulas/llmCalculations';
import { calculateTco } from './formulas/tco';
import { defaultModelId, getModelById } from './prices';
import { defaultComputeResourcePages, defaultInfrastructureCostColumnKey } from './content/infrastructureCost';

export function CalculatorApp() {
  const [modelId, setModelId] = useState(defaultModelId);
  const [exchangeRate, setExchangeRate] = useState(usdToGbp);
  const [documentStatisticsInputs, setDocumentStatisticsInputs] = useState(
    defaultDocumentStatisticsInputs,
  );
  const [computeResourcePages, setComputeResourcePages] = useState(
    defaultComputeResourcePages,
  );
  const [infrastructureColumnKey, setInfrastructureColumnKey] = useState(
    defaultInfrastructureCostColumnKey,
  );

  const model = useMemo(() => getModelById(modelId), [modelId]);

  const documentStatistics = useMemo(
    () => calculateDocumentStatistics(documentStatisticsInputs),
    [documentStatisticsInputs],
  );

  const llmCalculations = useMemo(
    () => calculateLlmCalculations(documentStatistics, model.prices, exchangeRate),
    [documentStatistics, model, exchangeRate],
  );

  const tco = useMemo(
    () =>
      calculateTco(
        documentStatistics,
        model.prices,
        exchangeRate,
        computeResourcePages,
        infrastructureColumnKey,
      ),
    [documentStatistics, model, exchangeRate, computeResourcePages, infrastructureColumnKey],
  );

  const handleDocumentStatisticsInputChange = <K extends keyof DocumentStatisticsInputs>(
    key: K,
    value: DocumentStatisticsInputs[K],
  ) => {
    setDocumentStatisticsInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="app">
      <main className="app-layout">
        <section className="app-row app-row--params">
          <ParamsPanel
            modelId={modelId}
            onModelChange={setModelId}
            exchangeRate={exchangeRate}
            onExchangeRateChange={setExchangeRate}
            documentStatisticsInputs={documentStatisticsInputs}
            documentStatistics={documentStatistics}
            onDocumentStatisticsInputChange={handleDocumentStatisticsInputChange}
          />
        </section>
        <section className="app-row app-row--infra">
          <InfrastructureCostTable
            computeResourcePages={computeResourcePages}
            onComputeResourcePagesChange={setComputeResourcePages}
            selectedColumnKey={infrastructureColumnKey}
            onSelectedColumnKeyChange={setInfrastructureColumnKey}
          />
        </section>
        <section className="app-row app-row--tco">
          <TcoTable
            tco={tco}
            stats={documentStatistics}
            llmCalculations={llmCalculations}
            computeResourcePages={computeResourcePages}
            infrastructureColumnKey={infrastructureColumnKey}
            exchangeRate={exchangeRate}
          />
        </section>
      </main>
    </div>
  );
}
