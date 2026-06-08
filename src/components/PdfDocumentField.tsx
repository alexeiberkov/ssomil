import {
  anthropicApproachNote,
  llmCachingNotes,
  pdfDocumentIntro,
} from '../content/pdfDocumentInfo';

export function PdfDocumentField() {
  return (
    <div className="field field--readonly">
      <span className="field-label">One PDF document</span>
      <p className="field-value">{pdfDocumentIntro}</p>
      <p className="pdf-document-note pdf-document-note--highlight">{anthropicApproachNote}</p>
      <ul className="pdf-document-llm-list">
        {llmCachingNotes.map(({ modelLabel, note }) => (
          <li key={modelLabel}>
            <strong>{modelLabel}</strong> — {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
