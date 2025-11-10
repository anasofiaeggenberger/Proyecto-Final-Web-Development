import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';

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

  // 🔹 Cargar publicaciones desde la base de datos
  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data: any[]) => {
        this.posts = data;
      },
      error: (err: any) => {
        console.error('❌ Error al cargar publicaciones:', err);
      }
    });
  }

  // 🔹 Crear una nueva publicación
  publish(): void {
    if (!this.newPost.trim()) return;

    this.loading = true;

    this.postService.createPost(this.newPost).subscribe({
      next: (res: any) => {
        this.newPost = '';
        this.loadPosts(); // recargar posts
        this.loading = false;
      },
      error: (err: any) => {
        console.error('❌ Error al publicar:', err);
        this.loading = false;
      }
    });
  }
}