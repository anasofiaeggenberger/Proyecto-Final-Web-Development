import { Component } from '@angular/core';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {
  questions: Question[] = [
    {
      question: '¿Quién fue el primer Vengador?',
      options: ['Iron Man', 'Capitán América', 'Thor', 'Hulk'],
      correct: 1
    },
    {
      question: '¿En qué película aparece por primera vez Spider-Man en el MCU?',
      options: [
        'Avengers: Age of Ultron',
        'Captain America: Civil War',
        'Spider-Man: Homecoming',
        'Avengers: Infinity War'
      ],
      correct: 1
    },
    {
      question: '¿Cuál es el nombre del martillo de Thor?',
      options: ['Stormbreaker', 'Gungnir', 'Mjolnir', 'Asgard'],
      correct: 2
    },
    {
      question: '¿Quién es el villano principal en Avengers: Endgame?',
      options: ['Loki', 'Thanos', 'Ultron', 'Red Skull'],
      correct: 1
    }
  ];

  currentIndex = 0;
  currentQuestion!: Question;
  feedback = '';
  showNext = false;
  showRestart = false;

  ngOnInit() {
    this.loadQuestion();
  }

  loadQuestion() {
    this.currentQuestion = this.questions[this.currentIndex];
    this.feedback = '';
    this.showNext = false;
  }

  checkAnswer(index: number) {
    if (this.showNext) return; // evita doble clic
    if (index === this.currentQuestion.correct) {
      this.feedback = '✅ ¡Correcto!';
    } else {
      this.feedback = '❌ Incorrecto.';
    }
    this.showNext = true;
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.loadQuestion();
    } else {
      this.feedback = '🎉 ¡Completaste la trivia!';
      this.showNext = false;
      this.showRestart = true;
    }
  }

  restartQuiz() {
    this.currentIndex = 0;
    this.showRestart = false;
    this.loadQuestion();
  }
}