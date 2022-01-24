import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { apiUrlLogin, apiUrlRegistration } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlRegistration = apiUrlRegistration;
  private apiUrlLogin = apiUrlLogin;

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  login(body: { email: string; password: string }) {
    return this.httpClient
      .post<{ accessToken: string }>(this.apiUrlLogin, body)
      .pipe(
        map((res) => ({
          ...res,
          ...this.jwtHelperService.decodeToken(res.accessToken),
        }))
      );
  }
}
