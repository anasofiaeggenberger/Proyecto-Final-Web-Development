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

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.selectedMood = localStorage.getItem('selectedMood');

    // 1️⃣ Obtener películas populares
    this.moviesService.getPopularMovies().subscribe({
      next: (data: any) => {
        this.popularMovies = data?.results || [];
      },
      error: (err: any) => {
        console.error('❌ Error al cargar películas populares:', err);
      }
    });

    // 2️⃣ Si hay mood guardado, obtener recomendaciones
    if (this.selectedMood) {
      this.moviesService.searchMoviesByMood(this.selectedMood).subscribe({
        next: (data: any) => {
          this.recommendedMovies = data?.results || [];
        },
        error: (err: any) => {
          console.error('❌ Error al cargar recomendaciones:', err);
        }
      });
    }
  }

  // 🔹 Abrir página oficial de la película (o proveedor)
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