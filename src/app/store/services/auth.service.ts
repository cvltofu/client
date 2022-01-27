import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  apiUrlLogin,
  apiUrlRegistration,
  apiUrlRefresh,
  apiUrlLogout,
} from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { select, Store } from '@ngrx/store';
import { AuthData } from '../auth-store/store/auth.reducer';
import { ADD_ACCESS_TOKEN } from '../auth-store/interceptors/token.interceptor';
import { getAuthData } from '../auth-store/store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlRegistration = apiUrlRegistration;
  private apiUrlLogin = apiUrlLogin;
  private apiUrlRefresh = apiUrlRefresh;
  private apiUrlLogout = apiUrlLogout;

  isAuth$ = this.store$.pipe(
    select(getAuthData),
    map((authData) => !!authData)
  );

  isGuest$ = this.isAuth$.pipe(map((isAuth) => !isAuth));

  constructor(
    private store$: Store,
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  registration(body: { username: string; email: string; password: string }) {
    return this.httpClient.post<{ accessToken: string }>(
      this.apiUrlRegistration,
      body
    );
  }

  login(body: { email: string; password: string }): Observable<AuthData> {
    return this.httpClient
      .post<{ accessToken: string }>(this.apiUrlLogin, body, {
        context: new HttpContext().set(ADD_ACCESS_TOKEN, false),
      })
      .pipe(
        map((res) => ({
          ...res,
          ...this.jwtHelperService.decodeToken(res.accessToken),
        }))
      );
  }

  refresh(): Observable<AuthData> {
    return this.httpClient
      .get<{ accessToken: string }>(this.apiUrlRefresh, {})
      .pipe(
        map((res) => ({
          ...res,
          ...this.jwtHelperService.decodeToken(res.accessToken),
        }))
      );
  }

  logout() {
    return this.httpClient.post(this.apiUrlLogout, {});
  }
}
