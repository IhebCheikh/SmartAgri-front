import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string="";
  email: string="";
  password: string="";

  constructor(private authService: AuthService) {}

  signUp() {
    const data = { name: this.name, email: this.email, password: this.password };
    this.authService.signUp(data).subscribe(response => {
      console.log('User signed up', response);
    });
  }
}
