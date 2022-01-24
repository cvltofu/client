import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
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

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

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
}
