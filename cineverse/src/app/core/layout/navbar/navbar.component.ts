import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDarkMode = true; // por defecto oscuro

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Al cargar la app, mantener el modo guardado
    const savedMode = localStorage.getItem('cineverse-theme');
    if (savedMode === 'light') {
      this.isDarkMode = false;
      document.body.classList.add('light-mode');
    } else {
      this.isDarkMode = true;
      document.body.classList.remove('light-mode');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('cineverse-theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('cineverse-theme', 'light');
    }
  }

  logout() {
    this.authService.logout();
  }
}