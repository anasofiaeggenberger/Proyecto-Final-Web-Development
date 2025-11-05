import { Component } from '@angular/core';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css']
})
export class ComunidadComponent {
  newPost: string = '';
  posts: { content: string; date: Date }[] = [];

  addPost() {
    if (this.newPost.trim() !== '') {
      this.posts.unshift({
        content: this.newPost.trim(),
        date: new Date()
      });
      this.newPost = '';
    }
  }
}