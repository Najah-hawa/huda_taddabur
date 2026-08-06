import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
@Component({
  selector: 'app-quix-tafser',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './quix-tafser.component.html',
  styleUrl: './quix-tafser.component.css'
})
export class QuixTafserComponent {
  constructor( public langService: LanguageService) {}
 quizStarted = false;

@Input() questions: { question: string; answers: { text: string; isCorrect: boolean }[] }[] = [];

  currentQuestionIndex = 0;
  showFeedback = false;
  isCorrect = false;
  quizCompleted = false;

  get totalQuestions(): number {
    return this.questions.length;
  }

  get currentQuestionNumber(): number {
    return this.currentQuestionIndex + 1;
  }

  checkAnswer(isCorrect: boolean) {
    this.showFeedback = true;
    this.isCorrect = isCorrect;

    if (isCorrect) {
      setTimeout(() => {
        this.showFeedback = false;
        this.isCorrect = false;
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex >= this.questions.length) {
          this.quizCompleted = true;
        }
      }, 1500);
    }
  }

restartQuiz() {
    this.currentQuestionIndex = 0;
    this.showFeedback = false;
    this.isCorrect = false;
    this.quizCompleted = false;
  }
 quitQuiz() {
  this.quizStarted = false;   // stänger quizet
  this.quizCompleted = false; // nollställer status
  this.currentQuestionIndex = 0; 
  this.showFeedback = false;
  this.isCorrect = false;
}
  showQuizSection() {
    this.quizStarted = true;  // <--- Gör quizet synligt
    this.quizCompleted = false;
    this.currentQuestionIndex = 0;
    this.showFeedback = false;
    this.isCorrect = false;

    setTimeout(() => {
      const quizEl = document.querySelector('.quiz-container');
      if (quizEl) {
        quizEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
}

