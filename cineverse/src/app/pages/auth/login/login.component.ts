import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email === 'admin@cineverse.com' && this.password === '1234') {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/']);
    } else {
      alert('Credenciales incorrectas. Intenta nuevamente.');
    }
  }
}