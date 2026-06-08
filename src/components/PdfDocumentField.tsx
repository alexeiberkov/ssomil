import { pdfDocumentIntro } from '../content/pdfDocumentInfo';

export function PdfDocumentField() {
  return (
    <div className="field field--readonly">
      <span className="field-label">One PDF document</span>
      <p className="field-value">{pdfDocumentIntro}</p>
    </div>
  );
}
