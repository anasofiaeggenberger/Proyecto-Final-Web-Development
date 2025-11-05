import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { TriviaComponent } from './pages/trivia/trivia.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'comunidad', component: ComunidadComponent },
  { path: 'trivia', component: TriviaComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}