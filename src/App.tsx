import { useMemo, useState } from 'react';
import { ParamsPanel } from './components/ParamsPanel';
import { TcoTable } from './components/TcoTable';
import { calculateTco } from './formulas/tco';
import { defaultModelId, getModelById } from './prices';

export default function App() {
  const [modelId, setModelId] = useState(defaultModelId);

  const tco = useMemo(() => {
    const model = getModelById(modelId);
    return calculateTco(model.prices);
  }, [modelId]);

  return (
    <div className="app">
      <main className="app-layout">
        <div className="app-column app-column--params">
          <ParamsPanel modelId={modelId} onModelChange={setModelId} />
        </div>
        <div className="app-column app-column--tco">
          <TcoTable tco={tco} />
        </div>
      </main>
    </div>
  );
}
