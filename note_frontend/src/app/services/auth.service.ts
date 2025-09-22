import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginPayload, SignupPayload } from '../models';
import { environment } from '../../environments/environment';

const TOKEN_KEY = 'nk_token';
const USER_EMAIL_KEY = 'nk_user_email';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private authState$ = new BehaviorSubject<boolean>(this.hasToken());

  // PUBLIC_INTERFACE
  isAuthenticated$(): Observable<boolean> {
    /** Returns observable auth state for UI components to react to login/logout. */
    return this.authState$.asObservable();
  }

  // PUBLIC_INTERFACE
  getToken(): string | null {
    /** Get stored JWT token if present. */
    return localStorage.getItem(TOKEN_KEY);
  }

  // PUBLIC_INTERFACE
  getUserEmail(): string | null {
    /** Get stored user email if present. */
    return localStorage.getItem(USER_EMAIL_KEY);
  }

  // PUBLIC_INTERFACE
  signup(payload: SignupPayload): Observable<AuthResponse> {
    /** Sign up a new user and store the returned token. */
    const url = `${environment.apiBaseUrl}/auth/signup`;
    return this.http.post<AuthResponse>(url, payload).pipe(
      tap((res) => {
        if ((res as any).token) {
          this.storeSession((res as any).token, payload.email);
        }
      })
    );
  }

  // PUBLIC_INTERFACE
  login(payload: LoginPayload): Observable<AuthResponse> {
    /** Log in a user and store the returned token. */
    const url = `${environment.apiBaseUrl}/auth/login`;
    return this.http.post<AuthResponse>(url, payload).pipe(
      tap((res) => {
        if ((res as any).token) {
          this.storeSession((res as any).token, payload.email);
        }
      })
    );
  }

  // PUBLIC_INTERFACE
  logout(): void {
    /** Clears token and updates auth state. */
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    this.authState$.next(false);
  }

  // PUBLIC_INTERFACE
  authHeaders(): HttpHeaders {
    /** Returns HTTP headers with Authorization if token available. */
    const token = this.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private storeSession(token: string, email: string) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_EMAIL_KEY, email);
    this.authState$.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}
