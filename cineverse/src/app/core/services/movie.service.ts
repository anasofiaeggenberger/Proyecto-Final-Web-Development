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

  // 🔹 Obtener películas populares
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=es-ES&page=1`);
  }

  // 🔹 Buscar películas por palabra clave o mood
  searchMoviesByMood(mood: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${environment.tmdbApiKey}&language=es-ES&query=${mood}`);
  }

  // 🔹 Obtener información detallada (para link externo)
  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${environment.tmdbApiKey}&language=es-ES`);
  }

  // 🔹 Obtener proveedores (dónde ver la película)
  getWatchProviders(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}/watch/providers?api_key=${environment.tmdbApiKey}`);
  }
}