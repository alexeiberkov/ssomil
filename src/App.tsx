import { useMemo, useState } from 'react';
import { ParamsPanel } from './components/ParamsPanel';
import { TcoTable } from './components/TcoTable';
import {
  calculateDocumentStatistics,
  defaultDocumentStatisticsInputs,
  type DocumentStatisticsInputs,
} from './formulas/documentStatistics';
import { usdToGbp } from './formulas/exchangeRate';
import { calculateTco } from './formulas/tco';
import { defaultModelId, getModelById } from './prices';

export default function App() {
  const [modelId, setModelId] = useState(defaultModelId);
  const [exchangeRate, setExchangeRate] = useState(usdToGbp);
  const [documentStatisticsInputs, setDocumentStatisticsInputs] = useState(
    defaultDocumentStatisticsInputs,
  );

  const model = useMemo(() => getModelById(modelId), [modelId]);

  const documentStatistics = useMemo(
    () => calculateDocumentStatistics(documentStatisticsInputs),
    [documentStatisticsInputs],
  );

  const tco = useMemo(
    () => calculateTco(model.prices, exchangeRate),
    [model, exchangeRate],
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
        <section className="app-row app-row--tco">
          <TcoTable tco={tco} prices={model.prices} exchangeRate={exchangeRate} />
        </section>
      </main>
    </div>
  );
}
