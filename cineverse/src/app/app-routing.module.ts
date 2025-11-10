import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { TriviaComponent } from './pages/trivia/trivia.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './core/guards/auth.guard'; // 👈 Importa el guard

const routes: Routes = [
  // Módulo de autenticación (login/register)
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },

  // Rutas principales protegidas por AuthGuard
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],  // 👈 Protege todas las rutas hijas
    children: [
      { path: '', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'comunidad', component: ComunidadComponent },
      { path: 'trivia', component: TriviaComponent },
      { path: 'about', component: AboutComponent },
    ],
  },

  // Redirección por defecto
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}