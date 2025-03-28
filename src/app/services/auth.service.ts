import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface AuthResponse {
  token: string;
  user: { username: string };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://netflix-laravel.onrender.com/api';

  // BehaviorSubject to keep track of the current user
  private currentUserSubject = new BehaviorSubject<{ username: string } | null>(
    this.loadUser()
  );

  // Expose the current user as an Observable
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Load user from localStorage if available
  private loadUser(): { username: string } | null {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    return token && username ? { username } : null;
  }

  // Save token and user info
  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem('access_token', authResponse.token);
    localStorage.setItem('username', authResponse.user.username);
    this.currentUserSubject.next(authResponse.user);
  }

  // Remove token and user info
  private clearSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }

  // Login method connecting to backend
  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((res) => this.setSession(res)),
        map(() => true),
        catchError((error) => {
          console.error('Login error', error);
          return of(false);
        })
      );
  }

  // Sign up method connecting to backend
  signUp(username: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, { username, password })
      .pipe(
        tap((res) => this.setSession(res)),
        map(() => true),
        catchError((error) => {
          console.error('Signup error', error);
          return of(false);
        })
      );
  }

  // Logout
  logout(): void {
    this.clearSession();
  }

  // Optionally, a getter to retrieve the current user value
  get currentUser(): { username: string } | null {
    return this.currentUserSubject.value;
  }

  // Optional: Method to call a protected route to get user info
  me(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }
}
