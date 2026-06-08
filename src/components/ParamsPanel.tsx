import { ModelSelector } from './ModelSelector';

interface ParamsPanelProps {
  modelId: string;
  onModelChange: (modelId: string) => void;
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="field field--readonly">
      <span className="field-label">{label}</span>
      <p className="field-value">{value}</p>
    </div>
  );
}

export function ParamsPanel({ modelId, onModelChange }: ParamsPanelProps) {
  return (
    <section className="panel params-panel">
      <h2>Params</h2>
      <div className="params-fields">
        <ReadOnlyField label="File name" value="ACO0000877018.pdf" />
        <ReadOnlyField
          label="One PDF document"
          value="Every PDF document is cached once, reducing repeated compute cost across all prompts"
        />
        <ModelSelector value={modelId} onChange={onModelChange} />
      </div>
    </section>
  );
}
