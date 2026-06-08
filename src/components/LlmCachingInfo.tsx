import { anthropicApproachNote } from '../content/pdfDocumentInfo';
import { getLlmModelDetailById } from '../content/llmModelDetails';

function ModelDetailSection({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="llm-model-detail__section">
      <span className="llm-model-detail__label">{label}</span>
      <p className="llm-model-detail__text">{children}</p>
    </div>
  );
}

interface LlmCachingInfoProps {
  modelId: string;
}

export function LlmCachingInfo({ modelId }: LlmCachingInfoProps) {
  const model = getLlmModelDetailById(modelId);

  if (!model) {
    return null;
  }

  return (
    <details className="llm-caching-info">
      <summary className="llm-caching-info__summary">More details...</summary>
      <div className="llm-caching-info__content">
        <p className="pdf-document-note pdf-document-note--highlight">{anthropicApproachNote}</p>

        <article className="llm-model-detail">
          <h4 className="llm-model-detail__title">{model.modelLabel}</h4>
          <div className="llm-model-detail__limoss-fit">
            <span className="llm-model-detail__rank" aria-hidden="true">
              {model.limossFitEmoji}
            </span>
            <div>
              <span className="llm-model-detail__label">LIMOSS Fit</span>
              <p className="llm-model-detail__limoss-fit-text">
                <span className="llm-model-detail__rank-label">Rank {model.limossFitRank}</span>
                {' — '}
                {model.limossFit}
              </p>
            </div>
          </div>
          <p className="llm-model-detail__caching">{model.cachingNote}</p>
          <ModelDetailSection label="Pros for LIMOSS extraction">{model.pros}</ModelDetailSection>
          <ModelDetailSection label="Cons / risks for LIMOSS extraction">{model.cons}</ModelDetailSection>
          <ModelDetailSection label="Best use in DEPS">{model.bestUse}</ModelDetailSection>
          <ModelDetailSection label="EPAM view">{model.epamView}</ModelDetailSection>
        </article>

        {model.references.length > 0 && (
          <div className="llm-model-detail__references">
            <span className="llm-model-detail__label">References</span>
            <ul>
              {model.references.map((ref) => (
                <li key={ref.url}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer">
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </details>
  );
}
