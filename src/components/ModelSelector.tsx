import { models } from '../prices';

interface ModelSelectorProps {
  value: string;
  onChange: (modelId: string) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <div className="field">
      <label htmlFor="llm-model">LLM model</label>
      <select
        id="llm-model"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.label}
          </option>
        ))}
      </select>
    </div>
  );
}
