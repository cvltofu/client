import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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

  constructor(private store$: Store, private router: Router) {}

  login(): void {
    this.store$.dispatch(login(this.user));
  }
}
