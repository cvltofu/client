import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  apiUrlLogin,
  apiUrlRegistration,
  apiUrlRefresh,
} from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthData } from '../auth-store/store/auth.reducer';
import { IS_CACHE_ENABLED } from '../auth-store/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlRegistration = apiUrlRegistration;
  private apiUrlLogin = apiUrlLogin;
  private apiUrlRefresh = apiUrlRefresh;

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  registration(body: { username: string; email: string; password: string }) {
    return this.httpClient.post<{ accessToken: string }>(
      this.apiUrlRegistration,
      body,
      { withCredentials: true }

      // { context: new HttpContext().set(IS_CACHE_ENABLED, true) }
    );
  }

  login(body: { email: string; password: string }): Observable<AuthData> {
    return this.httpClient
      .post<{ accessToken: string }>(
        this.apiUrlLogin,
        body,
        { withCredentials: true }
        // {context: new HttpContext().set(IS_CACHE_ENABLED, true),  }
      )
      .pipe(
        map((res) => ({
          ...res,
          ...this.jwtHelperService.decodeToken(res.accessToken),
        }))
      );
  }

  refresh(): Observable<AuthData> {
    return this.httpClient
      .get<{ accessToken: string }>(this.apiUrlRefresh, {
        withCredentials: true,
      })
      .pipe(
        map((res) => ({
          ...res,
          ...this.jwtHelperService.decodeToken(res.accessToken),
        }))
      );
  }
}
