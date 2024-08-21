import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  signUp(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string | undefined): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  /*
    createUser(user: User): Observable<User> {
      return this.http.post<User>(this.apiUrl, user);
  }
    /*
    updateUser(id: string, user: User): Observable<User> {
      return this.http.put<User>(`${this.apiUrl}/${id}`, user);
    }
  */
  deleteUser(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.role;
    }
    return null;
  }


  makeAdmin(superAdminId: string | null, userId: string | undefined): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}/makeAdmin`, { superAdminId });
  }

  makeUser(superAdminId: string | null, userId: string | undefined): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}/makeUser`, { superAdminId });
  }

  getCurrentUserId(): string | null {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) return null;

    const decodedToken = this.decodeToken(token);
    console.log('decodeToken :', decodedToken);

    return decodedToken ? decodedToken.id : null;
  }

  private decodeToken(token: string): any {
    console.log('decodeToken called with token:', token);
    // Décodage du token JWT pour récupérer l'ID utilisateur
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
