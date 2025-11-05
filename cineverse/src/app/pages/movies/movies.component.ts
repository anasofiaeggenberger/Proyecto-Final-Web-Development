import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  movies = [
    {
      title: 'La La Land',
      description: 'Una historia de amor entre sueños y música en Los Ángeles.',
      image: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'
    },
    {
      title: 'Inception',
      description: 'Los sueños y la realidad se entrelazan en un mundo imposible.',
      image: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
    },
    {
      title: 'Avengers: Endgame',
      description: 'Los héroes más poderosos del universo enfrentan su destino final.',
      image: 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg'
    },
    {
      title: 'Coco',
      description: 'Un viaje colorido al mundo de los recuerdos y la familia.',
      image: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg'
    },
    {
      title: 'Interstellar',
      description: 'La humanidad busca un nuevo hogar más allá de las estrellas.',
      image: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg'
    },
    {
      title: 'Pride & Prejudice',
      description: 'El amor y la sociedad en la Inglaterra del siglo XIX.',
      image: 'https://image.tmdb.org/t/p/w500/sGjIvtVvTlWnia2zfJfHz81pZ9Q.jpg'
    }
  ];
}