import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './core/layout/layout.component';
import { IndexComponent } from './pages/index/index.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { TriviaComponent } from './pages/trivia/trivia.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IndexComponent,
    MoviesComponent,
    ComunidadComponent,
    TriviaComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
