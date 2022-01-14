import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  constructor(private authService: AuthService, private router: Router) {}

  user: IUser = { email: '', password: '' };

  registration(): void {
    this.authService.registration(this.user);

    alert('A confirmation link has been sent to the specified email address.');
  }

  already() {
    this.router.navigate(['login']);
  }
}
