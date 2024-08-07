import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email="";
  password: string="";

  constructor(private authService: AuthService) {}

  login() {
    const data = { email: this.email, password: this.password };
    this.authService.login(data).subscribe(response => {
      console.log('User logged in', response);
    });
  }
}

