import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // 🔹 Obtener películas populares (con paginación)
  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=es-ES&page=${page}`);
  }

  // 🔹 Buscar películas por palabra clave o mood (fallback)
  searchMoviesByMood(mood: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${environment.tmdbApiKey}&language=es-ES&query=${mood}`);
  }

  // 🔹 Obtener películas por género (para recomendaciones por mood)
  getMoviesByGenres(genres: number[]): Observable<any> {
    const genreString = genres.join(',');
    return this.http.get(`${this.apiUrl}/discover/movie?api_key=${environment.tmdbApiKey}&language=es-ES&sort_by=popularity.desc&with_genres=${genreString}`);
  }

  // 🔹 Obtener detalles de una película
  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${environment.tmdbApiKey}&language=es-ES`);
  }

  // 🔹 Obtener proveedores (dónde ver la película)
  getWatchProviders(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}/watch/providers?api_key=${environment.tmdbApiKey}`);
  }
}