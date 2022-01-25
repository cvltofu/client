import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  delay,
  delayWhen,
  filter,
  first,
  map,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  login,
  loginSuccess,
  loginFailed,
  registration,
  registrationSuccess,
  registrationFailed,
} from './auth.actions';
import { AuthData } from './auth.reducer';
import { isAuth } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private store$: Store,
    private actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService
          .login({
            email: action.email,
            password: action.password,
          })
          .pipe(
            map((loginSuccessData: AuthData) => loginSuccess(loginSuccessData)),
            catchError((error) =>
              of(
                loginFailed({
                  serverError: error.message,
                })
              )
            )
          )
      )
    )
  );

  registration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registration),
      switchMap((action) =>
        this.authService
          .registration({
            username: action.username,
            email: action.email,
            password: action.password,
          })
          .pipe(
            map((registrationSuccessData) =>
              registrationSuccess(registrationSuccessData)
            ),
            catchError((error) =>
              of(
                registrationFailed({
                  serverError: error.message,
                })
              )
            )
          )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      delayWhen((action: AuthData) =>
        timer(action.exp * 1000 - 60 * 1000 - Date.now())
      ),
      switchMap(() =>
        this.store$.pipe(
          select(isAuth),
          first(),
          filter((isAuthent) => isAuthent)
        )
      ),
      switchMap(() =>
        this.authService
          .refresh()
          .pipe(
            map((loginSuccessData: AuthData) => loginSuccess(loginSuccessData))
          )
      )
    )
  );
}
