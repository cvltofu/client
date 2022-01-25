import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  catchError,
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
  initAuth,
  logoutSuccess,
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

  saveAuthDataToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((loginSuccessData) => {
          const { type, ...authData } = loginSuccessData;

          localStorage.setItem('authData', JSON.stringify(authData));
        })
      ),
    { dispatch: false }
  );

  extractLoginData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth),
      map(() => {
        const authDataString = localStorage.getItem('authData');

        if (!authDataString) {
          return logoutSuccess();
        }

        const authData: AuthData = JSON.parse(authDataString);

        if (authData.exp * 1000 - 10 * 1000 - Date.now() < 0) {
          return logoutSuccess();
        }

        return loginSuccess(authData);
      })
    )
  );
}
