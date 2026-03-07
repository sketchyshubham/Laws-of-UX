export interface Law {
  id: string;
  title: string;
  summary: string;
  tip: string;
  category: string;
  emoji: string;
}

export type Category = 'Information' | 'Meaning' | 'Time' | 'Memory' | 'Bias' | 'Effect' | 'Rule';

export interface Note {
  id: string;
  content: string;
  createdAt: number;
}

export interface GeminiResponse {
  coreSuggestion: string;
  relevantLaws: {
    id: string;
    contextualUsage: string;
  }[];
}
