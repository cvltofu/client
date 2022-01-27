import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  distinctUntilChanged,
  filter,
  first,
  fromEvent,
  map,
  of,
  skip,
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
  extractLoginData,
  logout,
} from './auth.actions';
import { AuthData } from './auth.reducer';
import { isAuth } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private store$: Store,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
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
            map((authData) => loginSuccess({ authData })),
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
      switchMap((action) =>
        timer(action.authData.exp * 1000 - 60 * 1000 - Date.now())
      ),
      switchMap(() =>
        this.store$.pipe(
          select(isAuth),
          first(),
          filter((isAuthent) => isAuthent)
        )
      ),
      switchMap(() => this.authService.refresh()),
      map((authData) => loginSuccess({ authData }))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() => this.authService.logout()),
      map(() => {
        localStorage.removeItem('authData');

        return logoutSuccess();
      })
    )
  );

  saveAuthDataToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ authData }) => {
          localStorage.setItem('authData', JSON.stringify(authData));
        })
      ),
    { dispatch: false }
  );

  extractLoginData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth, extractLoginData),
      map(() => {
        const authDataString = localStorage.getItem('authData');

        if (!authDataString) {
          return logoutSuccess();
        }

        const authData: AuthData = JSON.parse(authDataString);

        if (authData.exp * 1000 - 10 * 1000 - Date.now() < 0) {
          return logoutSuccess();
        }

        return loginSuccess({ authData });
      })
    )
  );

  listenStorageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth),
      switchMap(() => fromEvent(window, 'storage')),
      map(() => extractLoginData())
    )
  );

  listenAuthorizeEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initAuth),
        switchMap(() => this.authService.isAuth$),
        map((authData) => !!authData),
        distinctUntilChanged(),
        skip(1),
        tap((isAuthorized) => {
          this.router.navigate(isAuthorized ? ['/'] : ['/login']);
        })
      ),
    {
      dispatch: false,
    }
  );
}
