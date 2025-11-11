import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private openTriviaUrl = 'https://opentdb.com/api.php'; // API externa (no usada aún)
  private backendUrl = `${environment.apiUrl}/trivia`;   // tu backend (cineverse-api)
  private tmdbUrl = 'https://api.themoviedb.org/3';      // API de TMDB

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Obtener preguntas desde Open Trivia DB
   */
  getTriviaQuestions(amount: number = 10, category: number = 11, difficulty: string = 'medium'): Observable<any> {
    const url = `${this.openTriviaUrl}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http.get(url);
  }

  /**
   * 🔹 Guardar resultado de trivia en tu backend
   */
  saveTriviaResult(userId: string, category: string, score: number): Observable<any> {
    const body = { userId, category, score, date: new Date() };
    return this.http.post(`${this.backendUrl}/result`, body);
  }

  /**
   * 🔹 Obtener historial de trivias jugadas por usuario
   */
  getUserResults(userId: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/user/${userId}`);
  }

  /**
   * 🔹 Buscar películas por palabra clave (para generar trivias temáticas)
   */
  searchMoviesByKeyword(keyword: string): Observable<any> {
    const url = `${this.tmdbUrl}/search/movie?api_key=${environment.tmdbApiKey}&language=es-ES&query=${keyword}`;
    return this.http.get(url);
  }
}