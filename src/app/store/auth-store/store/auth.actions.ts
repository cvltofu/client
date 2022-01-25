import { createAction, props } from '@ngrx/store';
import { AuthData } from './auth.reducer';

export const registration = createAction(
  '[Auth] registration',
  props<{ username: string; email: string; password: string }>()
);

export const registrationSuccess = createAction(
  '[Auth] registration success',
  props<{ accessToken: string }>()
);

export const registrationFailed = createAction(
  '[Auth] registration failed',
  props<{ serverError: string }>()
);

export const login = createAction(
  '[Auth] login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] login success',
  props<AuthData>()
);

export const loginFailed = createAction(
  '[Auth] login failed',
  props<{ serverError: string }>()
);

export const logoutSuccess = createAction('[Auth] logout success');

export const initAuth = createAction('[Auth] init auth');
