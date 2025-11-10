import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popularMovies: any[] = [];
  recommendedMovies: any[] = [];
  selectedMood: string | null = null;
  currentPage: number = 1;
  loading: boolean = false;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.selectedMood = localStorage.getItem('selectedMood');
    this.loadPopularMovies();

    if (this.selectedMood) {
      this.loadMoodRecommendations(this.selectedMood);
    }
  }

  // 🔹 Cargar películas populares (paginadas)
  loadPopularMovies(): void {
    this.loading = true;
    this.moviesService.getPopularMovies(this.currentPage).subscribe({
      next: (data: any) => {
        this.popularMovies.push(...(data?.results || []));
        this.loading = false;
      },
      error: (err: any) => {
        console.error('❌ Error al cargar películas populares:', err);
        this.loading = false;
      }
    });
  }

  // 🔹 Cargar más películas
  loadMoreMovies(): void {
    this.currentPage++;
    this.loadPopularMovies();
  }

  // 🔹 Cargar recomendaciones según mood
  loadMoodRecommendations(mood: string): void {
    const moodGenres: Record<string, number[]> = {
      feliz: [35, 10751, 16],        // comedia, familia, animación
      triste: [18, 10749],           // drama, romance
      romantico: [10749, 35],        // romance, comedia
      energetico: [28, 12, 878],     // acción, aventura, sci-fi
      nostalgico: [16, 18, 10751]    // animación, drama, familia
    };
  
    const genres = moodGenres[mood.toLowerCase()] || [35];
  
    this.moviesService.getMoviesByGenres(genres).subscribe({
      next: (data: any) => {
        if (!data?.results?.length) {
          // Si no hay resultados por género, probar búsqueda por texto
          this.moviesService.searchMoviesByMood(mood).subscribe((fallback: any) => {
            this.recommendedMovies = fallback?.results || [];
          });
        } else {
          this.recommendedMovies = data.results;
        }
      },
      error: (err: any) => {
        console.error('❌ Error al cargar recomendaciones:', err);
      }
    });
  }  

  // 🔹 Abrir página oficial o TMDB
  openMovie(movieId: number): void {
    this.moviesService.getMovieDetails(movieId).subscribe({
      next: (movie: any) => {
        if (movie?.homepage) {
          window.open(movie.homepage, '_blank');
        } else {
          window.open(`https://www.themoviedb.org/movie/${movieId}`, '_blank');
        }
      },
      error: (err: any) => {
        console.error('❌ Error al abrir detalles de película:', err);
      }
    });
  }
}