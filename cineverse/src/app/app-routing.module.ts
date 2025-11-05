import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { TriviaComponent } from './pages/trivia/trivia.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'movies', component: MoviesComponent },
  { path: 'comunidad', component: ComunidadComponent },
  { path: 'trivia', component: TriviaComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }