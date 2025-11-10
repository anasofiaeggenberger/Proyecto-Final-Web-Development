import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService) {}

  onSubmit(): void {
    this.auth.login(this.email, this.password).subscribe({
      next: () => console.log('✅ Login exitoso'),
      error: (err) => {
        console.error('❌ Error en login:', err);
        this.errorMessage = err.error.message || 'Credenciales incorrectas';
      }
    });
  }
}