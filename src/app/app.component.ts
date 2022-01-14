import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './components/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  public accessToken?: string | null;
  public isAuth?: boolean;

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
