import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css']
})
export class ComunidadComponent implements OnInit {
  posts: any[] = [];
  newPost: string = '';
  loading: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('❌ Error al cargar publicaciones:', err)
    });
  }

  publish(): void {
    if (!this.newPost.trim()) return;

    this.loading = true;
    this.postService.createPost(this.newPost).subscribe({
      next: (res) => {
        this.newPost = '';
        this.loadPosts(); // recargar posts
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al publicar:', err);
        this.loading = false;
      }
    });
  }
}