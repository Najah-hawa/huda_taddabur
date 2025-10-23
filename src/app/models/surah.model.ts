export interface Verse {
  number: number;
  text: string;
  tafsir?: string; // optional
}

export interface Section {
  title: string;
  description: string;
  verseNumbers: number[];
}

export interface QuizAnswer {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  question: string;
  answers: QuizAnswer[];
}
