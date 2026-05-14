/**
 * Sentiment Sentiment types
 */
export enum SentimentType {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  NEUTRAL = "neutral",
}

export interface SentimentResult {
  score: number; // -1 to 1
  label: SentimentType;
  confidence: number;
  explanation: string;
  intensity: "low" | "medium" | "high";
}

export interface NLPStep {
  name: string;
  result: string | string[];
}
