import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.signUp(this.name, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/home']); // Redirige vers la page d'accueil en cas de succès
      },
      error: (err) => {
        this.errorMessage = 'Failed to register, please try again';
      },
    });
  }
}
