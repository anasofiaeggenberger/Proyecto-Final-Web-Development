import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

// Páginas
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { TriviaComponent } from './pages/trivia/trivia.component';
import { AboutComponent } from './pages/about/about.component';

// Módulo core (navbar, footer, layout)
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviesComponent,
    ComunidadComponent,
    TriviaComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule, 
    CoreModule    // ✅ agregado aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }