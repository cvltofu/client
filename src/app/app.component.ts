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
  public username = 'Anonim';

  ngOnInit(): void {
    this.authService.accessToken$.subscribe(() => {
      this.accessToken = localStorage.getItem('access-token');
    });

    // this.authService.user$.subscribe((value: any) => {
    //   console.log(value);
    //   this.username = value.email;
    // });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {}
}
