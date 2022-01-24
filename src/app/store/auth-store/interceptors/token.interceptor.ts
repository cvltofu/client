import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { catchError, EMPTY, first, mergeMap, Observable } from 'rxjs';
import { getAccessToken } from '../store/auth.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store$: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store$.pipe(
      select(getAccessToken),
      first(),
      mergeMap((token) => {
        const authReq = token
          ? req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
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
