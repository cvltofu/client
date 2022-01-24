import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlLogin, apiUrlRegistration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlRegistration = apiUrlRegistration;
  private apiUrlLogin = apiUrlLogin;

  constructor(private httpClient: HttpClient) {}

  login(body: { email: string; password: string }) {
    return this.httpClient.post<{ accessToken: string }>(
      this.apiUrlLogin,
      body
    );
  }
}
