import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  public accessToken?: string | null;
  public isAuth?: boolean;
  public username!: string;

  ngOnInit(): void {
    this.authService.accessToken$.subscribe(() => {
      this.accessToken = localStorage.getItem('access-token');
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {}
}
