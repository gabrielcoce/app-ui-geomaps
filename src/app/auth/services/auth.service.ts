import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { BackendApiService } from '../../maps/services';
import { IRSignin, ISignin, IToken } from '../interfaces/auth.interface';
import { ignoreElements, tap } from 'rxjs';

const TOKEN_KEY = 'access_token';
const USER_NAME_KEY = 'user_name';
const ROLE_KEY = 'roles';
const EXP_KEY = 'expires_in';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string | null = null;
  private _router = inject(Router);
  private readonly _apiSvc = inject(BackendApiService);
  constructor() {}

  login(username: string, password: string) {
    const data: ISignin = {
      username,
      password,
    };
    return this._apiSvc.signin(data).pipe(
      tap((jwt) => this.saveTokenToLocalStore(jwt)),
      tap(() => this.redirectToMaps()),
      ignoreElements()
    );
  }

  logout() {
    this.removeTokenLocalStorage();
    this._router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(TOKEN_KEY) !== null && !this.isTokenExpire();
    //return localStorage.getItem(TOKEN_KEY) !== null;
  }

  private redirectToMaps(): void {
    this._router.navigateByUrl('/maps');
  }
  private saveTokenToLocalStore(token: IRSignin): void {
    this.removeTokenLocalStorage();
    if (token) {
      const user = this.decodeToken(token.accessToken);
      localStorage.setItem(TOKEN_KEY, token.accessToken);
      // localStorage.setItem(USER_NAME_KEY, user.username);
      localStorage.setItem(ROLE_KEY, JSON.stringify(token.roles));
      const expires_in = (user.exp - 60) * 1000;
      localStorage.setItem(EXP_KEY, JSON.stringify(expires_in));
      //this.test().subscribe({next: (data=>{ console.log(data)})});
    }
  }
  private removeTokenLocalStorage(): void {
    localStorage.removeItem(TOKEN_KEY);
    //localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EXP_KEY);
  }

  private decodeToken(userToken: string): IToken {
    const userInfo: IToken = jwtDecode(userToken);
    console.log(jwtDecode(userToken));
    return { ...userInfo };
  }
  private isTokenExpire() {
    const expires_in = localStorage.getItem(EXP_KEY);
    return expires_in
      ? dayjs(Date.now()).isSameOrAfter(parseInt(expires_in))
      : false;
  }
}
