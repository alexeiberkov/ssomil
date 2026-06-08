export const pdfDocumentIntro =
  'Every PDF document is cached once, reducing repeated compute cost across all prompts.';

export const anthropicApproachNote =
  'This calculator uses the Anthropic caching approach: separate charges for cache writes (5m / 1h TTL) and cache reads. OpenAI models are shown for comparison — their prices are mapped to the same structure, but OpenAI uses automatic prompt caching without a separate write surcharge.';
