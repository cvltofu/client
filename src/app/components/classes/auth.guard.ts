import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/store/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.getIsAuth();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  private getIsAuth(): Observable<boolean> {
    return this.authService.isAuth$.pipe(
      map((isAuth) => {
        if (isAuth) {
          return true;
        }

        this.router.navigate(['/login']);

        return false;
      })
    );
  }
}
