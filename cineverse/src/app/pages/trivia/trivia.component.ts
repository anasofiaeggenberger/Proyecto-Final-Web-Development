import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../../core/services/trivia.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {
  // 🔹 Datos de trivia
  categories = [
    { name: 'Avengers', keyword: 'Avengers', color: '#8B0000' },
    { name: 'Harry Potter', keyword: 'Harry Potter', color: '#3C2A4D' },
    { name: 'Back to the Future', keyword: 'Back to the Future', color: '#FFB400' },
    { name: 'Star Wars', keyword: 'Star Wars', color: '#1C1C1C' },
    { name: 'Barbie', keyword: 'Barbie', color: '#FF69B4' }
  ];

  selectedCategory: any = null;
  questions: any[] = [];
  currentQuestionIndex = 0;
  score = 0;
  showResults = false;
  selectedAnswer: string | null = null;
  userId: string = '';
  loading = false;

  constructor(
    private triviaService: TriviaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userId = user?._id || '';
  }

  goBackToCategories(): void {
    this.showResults = false;
    this.selectedCategory = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
  }  

  // 🔹 Método seguro para usar en el HTML (evita regex)
  getClassName(name: string): string {
    return name.toLowerCase().split(' ').join('');
  }

  // 🔹 Seleccionar categoría
  selectCategory(category: any): void {
    this.selectedCategory = category;
    this.loadQuestions(category.keyword);
  }

  // 🔹 Cargar preguntas según categoría (usa palabra clave)
  loadQuestions(keyword: string): void {
    this.loading = true;
  
    const triviaData: any = {
      Avengers: [
        { question: '¿Quién es digno de levantar el Mjolnir además de Thor?', correct_answer: 'Capitán América', answers: ['Iron Man', 'Hulk', 'Capitán América', 'Thanos'] },
        { question: '¿Cuál es el nombre verdadero de Black Widow?', correct_answer: 'Natasha Romanoff', answers: ['Wanda Maximoff', 'Natasha Romanoff', 'Carol Danvers', 'Maria Hill'] },
        { question: '¿En qué película dice Tony Stark “Yo soy Iron Man”?', correct_answer: 'Endgame', answers: ['Infinity War', 'Age of Ultron', 'Endgame', 'Civil War'] },
      ],
      'Harry Potter': [
        { question: '¿Cómo se llama el profesor de pociones en el primer año?', correct_answer: 'Severus Snape', answers: ['Horace Slughorn', 'Remus Lupin', 'Severus Snape', 'Gilderoy Lockhart'] },
        { question: '¿Qué casa tiene como símbolo un tejón?', correct_answer: 'Hufflepuff', answers: ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'] },
        { question: '¿Cómo se llama el hermano de Dumbledore?', correct_answer: 'Aberforth', answers: ['Percival', 'Aberforth', 'Grindelwald', 'Alastor'] },
      ],
      'Back to the Future': [
        { question: '¿Cuál es la fecha del primer viaje en el tiempo?', correct_answer: '5 de noviembre de 1955', answers: ['25 de diciembre de 1985', '5 de noviembre de 1955', '21 de octubre de 2015', '1 de enero de 2000'] },
        { question: '¿Cuál es el nombre del perro de Doc?', correct_answer: 'Einstein', answers: ['Newton', 'Einstein', 'Copérnico', 'Tesla'] },
        { question: '¿Qué velocidad necesita el DeLorean para viajar en el tiempo?', correct_answer: '88 mph', answers: ['100 mph', '50 mph', '88 mph', '77 mph'] },
      ],
      'Star Wars': [
        { question: '¿Quién fue el maestro de Obi-Wan Kenobi?', correct_answer: 'Qui-Gon Jinn', answers: ['Yoda', 'Qui-Gon Jinn', 'Mace Windu', 'Anakin Skywalker'] },
        { question: '¿Cuál es el planeta natal de Luke Skywalker?', correct_answer: 'Tatooine', answers: ['Alderaan', 'Tatooine', 'Naboo', 'Hoth'] },
        { question: '¿Qué actor interpreta a Han Solo?', correct_answer: 'Harrison Ford', answers: ['Mark Hamill', 'Harrison Ford', 'Ewan McGregor', 'Liam Neeson'] },
      ],
      'Barbie': [
        { question: '¿Cómo se llama el personaje de Ryan Gosling en Barbie (2023)?', correct_answer: 'Ken', answers: ['Ken', 'Allan', 'Carl', 'Steve'] },
        { question: '¿Qué color predomina en Barbieland?', correct_answer: 'Rosa', answers: ['Azul', 'Blanco', 'Rosa', 'Dorado'] },
        { question: '¿Quién dirige la película Barbie (2023)?', correct_answer: 'Greta Gerwig', answers: ['Greta Gerwig', 'Margot Robbie', 'Patty Jenkins', 'Sofia Coppola'] },
      ]
    };
  
    this.questions = triviaData[keyword] || [];
    this.loading = false;
  }  

  // 🔹 Barajar respuestas
  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  // 🔹 Seleccionar respuesta
  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  // 🔹 Pasar a siguiente pregunta
  nextQuestion(): void {
    const current = this.questions[this.currentQuestionIndex];
    if (this.selectedAnswer === current.correct_answer) this.score++;

    this.selectedAnswer = null;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showResults = true;
      this.saveResult();
    }
  }

  // 🔹 Guardar resultado
  saveResult(): void {
    if (!this.userId || !this.selectedCategory) return;

    this.triviaService.saveTriviaResult(
      this.userId,
      this.selectedCategory.name,
      this.score
    ).subscribe({
      next: () => console.log('✅ Resultado guardado en MongoDB'),
      error: (err: any) => console.error('❌ Error al guardar resultado:', err)
    });
  }

  // 🔹 Reiniciar trivia
  restartTrivia(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showResults = false;
    this.selectedAnswer = null;
    this.selectedCategory = null;
    this.questions = [];
  }
}