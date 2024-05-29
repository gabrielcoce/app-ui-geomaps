import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import dayjs from 'dayjs';

const TOKEN_KEY = 'access_token';
const USER_NAME_KEY = 'user_name';
const ROLE_KEY = 'role';
const EXP_KEY = 'expires_in';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string | null = null;
  private _router = inject(Router);
  constructor() {}

  login(user: string, password: string) {
    this.saveTokenToLocalStore('token');
    this._router.navigate(['maps']);
  }

  logout() {
    this.removeTokenLocalStorage();
    this._router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    //return (localStorage.getItem(TOKEN_KEY) !== null && !this.isTokenExpire());
    return localStorage.getItem(TOKEN_KEY) !== null;
  }
  private saveTokenToLocalStore(token: string): void {
    this.removeTokenLocalStorage();
    if (token) {
      //const user = this.decodeToken(token);
      localStorage.setItem(TOKEN_KEY, 'token');
      // localStorage.setItem(USER_NAME_KEY, user.username);
      // localStorage.setItem(ROLE_KEY, JSON.stringify(user.role));
      // const expires_in = (user.exp - 30) * 1000;
      // localStorage.setItem(EXP_KEY, JSON.stringify(expires_in));
      //this.test().subscribe({next: (data=>{ console.log(data)})});
    }
  }
  private removeTokenLocalStorage(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EXP_KEY);
  }
  private isTokenExpire() {
    const expires_in = localStorage.getItem(EXP_KEY);
    return expires_in
      ? dayjs(Date.now()).isSameOrAfter(parseInt(expires_in))
      : false;
  }
}
