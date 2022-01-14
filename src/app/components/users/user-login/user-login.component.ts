import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  constructor(private authService: AuthService) {}

  user: IUser = { email: '', password: '' };

  login(): void {
    this.authService.login(this.user);
  }
}
