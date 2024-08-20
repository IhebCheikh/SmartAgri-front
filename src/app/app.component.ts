import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { AuthService } from './services/auth.service';
import {AdministratorComponent} from "./administrator/administrator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink, AdministratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smartagri-frontend';

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
