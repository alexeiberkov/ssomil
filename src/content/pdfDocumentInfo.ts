export const pdfDocumentIntro =
  'Every PDF document is cached once, reducing repeated compute cost across all prompts.';

export const anthropicApproachNote =
  'This calculator uses the Anthropic caching approach: separate charges for cache writes (5m / 1h TTL) and cache reads. OpenAI models are shown for comparison — their prices are mapped to the same structure, but OpenAI uses automatic prompt caching without a separate write surcharge.';

export const llmCachingNotes: { modelLabel: string; note: string }[] = [
  {
    modelLabel: 'Anthropic Sonnet 4.5',
    note: 'Native Anthropic prompt caching — explicit cache write and cache read pricing.',
  },
  {
    modelLabel: 'Claude Haiku 4.5',
    note: 'Same Anthropic caching model as Sonnet, with lower token rates.',
  },
  {
    modelLabel: 'OpenAI GPT-4o',
    note: 'Automatic prompt caching (no write surcharge). Prices mapped to Anthropic-style fields for side-by-side comparison.',
  },
  {
    modelLabel: 'OpenAI GPT-5',
    note: 'Automatic prompt caching with up to ~90% discount on cached input. Mapped to Anthropic-style fields for comparison.',
  },
];
