import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] login success',
  props<{
    accessToken: string;
    username: string;
    email: string;
    id: string;
    isActivated: boolean;
    iat: number;
    exp: number;
  }>()
);

export const loginFailed = createAction(
  '[Auth] login failed',
  props<{ serverError: string }>()
);
