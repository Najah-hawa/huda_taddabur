export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizData {
  hadith_title_prov: string;
  questions: Question[];
}