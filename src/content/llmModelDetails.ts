export interface LlmModelReference {
  label: string;
  url: string;
}

export interface LlmModelDetail {
  modelId: string;
  modelLabel: string;
  limossFitRank: number;
  limossFitEmoji: string;
  limossFit: string;
  cachingNote: string;
  pros: string;
  cons: string;
  bestUse: string;
  epamView: string;
  references: LlmModelReference[];
}

export const llmModelDetails: LlmModelDetail[] = [
  {
    modelId: 'anthropic-sonnet-4.5',
    modelLabel: 'Anthropic Sonnet 4.5',
    limossFitRank: 2,
    limossFitEmoji: '🙂',
    limossFit: 'Strong alternative for complex insurance wording',
    cachingNote:
      'Native Anthropic prompt caching — explicit cache write and cache read pricing.',
    pros:
      'Strong candidate for complex insurance documents where wording is nuanced and context-heavy: MRCs, binders, endorsements, clauses, ambiguous coverage language, multi-page reasoning, cross-field consistency. Good fit where the model must understand the business meaning of a field, not just extract nearby text. Pricing is aligned with the earlier Sonnet 4 level at $3 input / $15 output per 1M tokens.',
    cons:
      'More expensive than Haiku and GPT-5 on input. May be overkill for simple fields like dates, reference numbers, simple enumerations, or document classification. If used for every field/page, it can push extraction cost up, especially for 60-page average MRCs.',
    bestUse:
      'Use as primary high-accuracy extractor for complex fields, clause-level interpretation, ambiguous sections, fallback extraction, and judge/validator for low-confidence results.',
    epamView:
      'Our recommendation: best quality-oriented Anthropic option and a strong default for the “hard 20–30%” of LIMOSS extraction where BPO corrections are most costly.',
    references: [
      {
        label: 'Introducing Claude Sonnet 4.5 — Anthropic',
        url: 'https://www.anthropic.com/news/claude-sonnet-4-5',
      },
    ],
  },
  {
    modelId: 'claude-haiku-4.5',
    modelLabel: 'Claude Haiku 4.5',
    limossFitRank: 3,
    limossFitEmoji: '😐',
    limossFit: 'Best low-cost option for simple extraction and classification',
    cachingNote:
      'Same Anthropic caching model as Sonnet, with lower token rates.',
    pros:
      'Much better unit economics: $1 input / $5 output per 1M tokens. Anthropic positions it as near-frontier performance with much higher cost efficiency; they also describe it as 4–5x faster than Sonnet 4.5 in some customer-reported contexts. Good for high-volume extraction, classification, routing, simple field extraction, and parallel processing.',
    cons:
      'Higher risk on subtle interpretation: complex coverage clauses, nested conditions, endorsements, inconsistent tables, or fields requiring domain reasoning. May produce more “looks plausible but wrong” values unless constrained by prompt, schema, validation rules and confidence thresholds.',
    bestUse:
      'Use as cost-efficient workhorse for classification, first-pass extraction of simple fields, page triage, document type routing, and pre-validation. Escalate low-confidence or business-critical fields to Sonnet/GPT-5.',
    epamView:
      'Our recommendation: best cost-control option. Not recommended as the sole model for LIMOSS, but highly useful in a routed architecture.',
    references: [
      {
        label: 'Introducing Claude Haiku 4.5 — Anthropic',
        url: 'https://www.anthropic.com/news/claude-haiku-4-5',
      },
    ],
  },
  {
    modelId: 'openai-gpt-4o',
    modelLabel: 'OpenAI GPT-4o',
    limossFitRank: 4,
    limossFitEmoji: '🙁',
    limossFit: 'Mature fallback, but less future-oriented',
    cachingNote:
      'Automatic prompt caching (no write surcharge). Prices mapped to Anthropic-style fields for side-by-side comparison.',
    pros:
      'Mature, broadly adopted, strong multimodal/text capability, historically good for OCR-adjacent workflows and structured JSON extraction. Good if existing DEPS/Azure OpenAI integrations are already validated with GPT-4o. Strong for mixed document understanding where text, layout and images are involved.',
    cons:
      'It is no longer the most compelling cost/performance option compared with newer OpenAI models. For new implementation, it may look like a legacy baseline rather than forward-looking choice. Public OpenAI pricing pages now emphasize newer GPT-5.x models; third-party pricing summaries describe GPT-4o as legacy/grandfathered around $2.50 input / $10 output per 1M tokens, but this should be verified against the exact Azure/OpenAI contract used for LIMOSS.',
    bestUse:
      'Use as baseline / fallback / compatibility model if GPT-4o is already approved, stable in the client environment, or easier to procure through Azure OpenAI.',
    epamView:
      'Our recommendation: a safe fallback option, but not the primary strategic choice. GPT-4o should not be the headline model unless procurement or Azure availability requires it.',
    references: [
      {
        label: 'OpenAI API Pricing 2026 — PE Collective',
        url: 'https://pecollective.com/tools/openai-api-pricing/',
      },
    ],
  },
  {
    modelId: 'openai-gpt-5',
    modelLabel: 'OpenAI GPT-5',
    limossFitRank: 1,
    limossFitEmoji: '😃',
    limossFit: 'Best strategic model for complex LIMOSS extraction',
    cachingNote:
      'Automatic prompt caching with up to ~90% discount on cached input. Mapped to Anthropic-style fields for comparison.',
    pros:
      'Strong strategic candidate for LIMOSS because it combines high reasoning capability with attractive API pricing: OpenAI’s GPT-5 page lists text & vision, 400K context, 128K max output, $1.25 input / $10 output per 1M tokens. Very suitable for long MRC documents, cross-page extraction, structured output generation, ACORD mapping checks, and LLM-as-judge validation.',
    cons:
      'Reasoning models may consume more output/reasoning tokens depending on configuration, so real cost must be benchmarked on LIMOSS samples rather than calculated only from input/output list price. Also, GPT-5 availability, data residency and Azure/OpenAI deployment model need to be checked for the specific LIMOSS environment. OpenAI’s current pricing page highlights newer GPT-5.4/5.5 lines and notes regional processing uplift for eligible data residency endpoints.',
    bestUse:
      'Use as primary OpenAI strategic model for complex extraction, validation, ACORD transformation checks, field consistency, and fallback for documents where Haiku/simple extraction is insufficient.',
    epamView:
      'Our recommendation: best overall OpenAI choice if available in the target deployment, with a strong case for future-proofing and cost reduction versus older GPT-4o-style setups.',
    references: [
      {
        label: 'GPT-5 is here — OpenAI',
        url: 'https://openai.com/gpt-5/',
      },
      {
        label: 'Pricing — OpenAI API',
        url: 'https://developers.openai.com/api/docs/pricing',
      },
    ],
  },
];

export function getLlmModelDetailById(modelId: string): LlmModelDetail | undefined {
  return llmModelDetails.find((model) => model.modelId === modelId);
}
