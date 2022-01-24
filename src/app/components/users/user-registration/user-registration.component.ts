import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { registration } from 'src/app/store/auth-store/store/auth.actions';

import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  constructor(private store$: Store, private router: Router) {}

  user: IUser = { username: '', email: '', password: '' };

  registration(): void {
    this.store$.dispatch(registration(this.user));
    // this.authService.registration(this.user);

    alert('A confirmation link has been sent to the specified email address.');
  }

  already() {
    this.router.navigate(['login']);
  }
}
