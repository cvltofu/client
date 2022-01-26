import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { apiUrlRegistration, apiUrlLogin } from 'src/environments/environment';
import { IUser } from '../users/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrlRegistration = apiUrlRegistration;
  private apiUrlLogin = apiUrlLogin;

  public user$ = new BehaviorSubject({});
  public accessToken$ = new BehaviorSubject('');

  constructor(
    private readonly httpService: HttpClient,
    private readonly router: Router
  ) {}

  registration(user: IUser) {
    return this.httpService
      .post(this.apiUrlRegistration, user)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  login(user: IUser) {
    return this.httpService
      .post(this.apiUrlLogin, user)
      .subscribe((value: any) => {
        this.setToken(value.accessToken);

        this.accessToken$.next(value.accessToken);
        this.user$.next(value.user);

        this.router.navigate(['']);
      });
  }

  logout() {
    localStorage.clear();
    this.accessToken$.next('');
  }

  setToken(token: string) {
    localStorage.setItem('access-token', token);
  }

  getToken() {
    return localStorage.getItem('access-token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access-token');
  }
}
