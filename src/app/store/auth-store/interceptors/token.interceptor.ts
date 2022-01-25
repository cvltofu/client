import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { catchError, EMPTY, first, mergeMap, Observable, tap } from 'rxjs';
import { getAccessToken } from '../store/auth.selectors';

export const IS_CACHE_ENABLED = new HttpContextToken<boolean>(() => false);

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store$: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (req.context.get(IS_CACHE_ENABLED) === true) {}
    return this.store$.pipe(
      select(getAccessToken),
      first(),
      mergeMap((token) => {
        const authReq = token
          ? req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
              // withCredentials: true,
            })
          : req;

        return next.handle(authReq).pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              this.router.navigate(['/login']);
              return EMPTY;
            }
            throw error;
          })
        );
      })
    );
  }
}
