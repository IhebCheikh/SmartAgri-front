import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Assurez-vous que l'URL correspond à votre backend

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); // Enregistre le token localement
      })
    );
  }

  signUp(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); // Enregistre le token localement
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirige vers la page de connexion après la déconnexion
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
