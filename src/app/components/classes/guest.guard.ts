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
export class GuestGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.getIsGuest();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  private getIsGuest(): Observable<boolean> {
    return this.authService.isGuest$.pipe(
      map((isGuest) => {
        if (isGuest) {
          return true;
        }

        this.router.navigate(['/']);

        return false;
      })
    );
  }
}
