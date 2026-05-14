/**
 * Simulates basic NLP preprocessing steps for visualization
 */
export const STOPWORDS = new Set(["a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "to", "in", "of", "it", "that"]);

export function tokenize(text: string): string[] {
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

export function removeStopwords(tokens: string[]): string[] {
  return tokens.filter(token => !STOPWORDS.has(token));
}

export function performPreprocessing(text: string) {
  const step1 = tokenize(text);
  const step2 = removeStopwords(step1);
  const step3 = [...new Set(step2)]; // Unique tokens

  return [
    { name: "Original Text", result: text },
    { name: "Tokenization", result: step1 },
    { name: "Stopword Removal", result: step2 },
    { name: "Normalization", result: step3 },
  ];
}
