import { anthropicSonnet45 } from './anthropic-sonnet-4.5';
import { claudeHaiku45 } from './claude-haiku-4.5';
import { openaiGpt4o } from './openai-gpt-4o';
import { openaiGpt5 } from './openai-gpt-5';
import type { ModelPricing } from './types';

export const models: ModelPricing[] = [
  anthropicSonnet45,
  claudeHaiku45,
  openaiGpt4o,
  openaiGpt5,
];

export const defaultModelId = anthropicSonnet45.id;

export function getModelById(id: string): ModelPricing {
  return models.find((m) => m.id === id) ?? anthropicSonnet45;
}

export type { ModelPricing, TokenPrices } from './types';
