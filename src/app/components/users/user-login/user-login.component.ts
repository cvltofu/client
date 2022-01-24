import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from 'src/app/store/auth-store/store/auth.actions';

import * as auth from 'src/app/store/auth-store/store/auth.selectors';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  user: IUser = { username: '', email: '', password: '' };

  loading$: Observable<boolean> = this.store$.pipe(select(auth.getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(auth.getLoaded));
  serverError$: Observable<string> = this.store$.pipe(
    select(auth.getServerError)
  );

  constructor(private store$: Store, private router: Router) {}

  login(): void {
    this.store$.dispatch(login(this.user));

    if (this.loaded$) {
      this.router.navigate(['']);
    }
    // this.authService.login(this.user);
  }
}
