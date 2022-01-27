import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { logout } from 'src/app/store/auth-store/store/auth.actions';
import {
  getAuthData,
  isAuth,
} from 'src/app/store/auth-store/store/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private store$: Store) {}

  public isAuth$: Observable<boolean> = this.store$.pipe(select(isAuth));
  public username$: Observable<string> = this.store$.pipe(
    select(getAuthData),
    filter((authData) => authData !== undefined),
    map((authData) => (authData ? authData.username : 'Anonim'))
  );

  logout() {
    this.store$.dispatch(logout());
  }
}
