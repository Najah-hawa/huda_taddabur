import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router'; // 👈 مهم جداً
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizData, Question } from '../../../models/quiz-data.model';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-quix',
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './prov.component.html',
  styleUrl: './prov.component.css'
})
export class ProvComponent implements OnInit {
  @Input() quizData!: QuizData; // Vi tar emot hela quiz-paketet (titel och frågor)

  // Intern status
  currentQuestionIndex = 0;

  firstAttempts = 0; // Antal frågor som klarades på första försöket
  firstAttemptPerQuestion = 0; // Försök för den aktuella frågan
  selectedOption: string | null = null;
  feedbackText = '';
  feedbackColor = '';
  correctFeedbackColor = '#34a853'; // En fin grön färg
  wrongFeedbackColor = '#ea4335';   // En fin röd färg
  quizComplete = false;
  isCorrect: boolean | null = null; // Status för feedback (null, true, false)

  get currentQuestion(): Question {
    return this.quizData.questions[this.currentQuestionIndex];
  }

  get totalQuestions(): number {
    return this.quizData.questions.length;
  }

  get progressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
  }

  ngOnInit(): void {
    // Kontrollera att data finns
    if (!this.quizData || !this.quizData.questions || this.quizData.questions.length === 0) {
      console.error('Quiz-data saknas!');
    }
  }

  // دالة تشغيل الصوت والقصاصات عند انتهاء الأسئلة
  triggerSuccessEffects(): void {
    // 2. تأثير القصاصات الملونة (تأثير انفجار احتفالي)
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 } // يبدأ الانفجار من منتصف الشاشة تقريباً ليملأ المكان
    });

    // 3. تشغيل صوت النجاح
    // تأكدي من وضع ملف الصوت داخل مجلد assets في مشروعك وتسميته مثلاً success.mp3
    const audio = new Audio('/audio/play-game/klapping.mpeg');
    audio.volume = 0.5; // يمكنكِ التحكم بـ مستوى الصوت من 0 إلى 1
    audio.play().catch(error => console.log("Audio play blocked by browser:", error));
  }


  selectOption(option: string): void {
    if (this.isCorrect !== null) return; // Förhindra val efter feedback
    
    this.selectedOption = option;
    this.firstAttemptPerQuestion++;

    if (option === this.currentQuestion.correctAnswer) {
      this.isCorrect = true;
      this.feedbackText = 'أحسنت! إجابة صحيحة.';
      this.feedbackColor = this.correctFeedbackColor;
      
      if (this.firstAttemptPerQuestion === 1) {
        this.firstAttempts++;
      }

      // Gå vidare efter 1 sekunder
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    } else {
      this.isCorrect = false;
      this.feedbackText = 'إجابة خاطئة. حاول مرة أخرى.';
      this.feedbackColor = this.wrongFeedbackColor;

      
      // Ta bort shake-animationen efter ett tag
      setTimeout(() => {

        this.selectedOption = null; // Tillåt nytt val
        this.isCorrect = null; // Ta bort feedback
      }, 1000);
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = null;
      this.feedbackText = '';
      this.feedbackColor = '';
      this.firstAttemptPerQuestion = 0;
      this.isCorrect = null;
    } else {
      this.quizComplete = true;
      this.triggerSuccessEffects();
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.firstAttempts = 0;
    this.firstAttemptPerQuestion = 0;
    this.selectedOption = null;
    this.isCorrect = null;

    this.feedbackText = '';
    this.feedbackColor = '';
    this.quizComplete = false;
  }

    // 👈 حدث جديد لإعلام المكون الأب برغبة الطالب في إنهاء الاختبار
  @Output() closeQuiz = new EventEmitter<void>();
  // 👈 دالة إنهاء الاختبار
  exitQuiz(): void {
    this.closeQuiz.emit();
  }
} 