export interface Sentence {
  id: string;
  sentence: string;
  source: Source;
}

export interface Source {
  date: string;
  id: string;
  url: string;
}

export interface SentencesResponse {
  count: number;
  sentences: Sentence[];
}
