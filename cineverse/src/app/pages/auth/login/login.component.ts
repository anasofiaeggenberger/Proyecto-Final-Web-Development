import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.errorMsg = '';
      this.router.navigate(['/']); // entra al home
    } else {
      this.errorMsg = 'Credenciales incorrectas. Intenta nuevamente.';
    }
  }
}