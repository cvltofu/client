import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailed,
  loginSuccess,
  registration,
  registrationFailed,
  registrationSuccess,
} from './auth.actions';

export const AUTH_FEATURENAME = 'auth';

export interface AuthData {
  accessToken: string;
  username: string;
  email: string;
  id: string;
  isActivated: boolean;
  iat: number;
  exp: number;
}

export interface AuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData?: AuthData;
}

const initialState: AuthState = {
  loaded: true,
  loading: false,
  serverError: '',
};

export const authReducer = createReducer(
  initialState,

  on(login, (state) => ({
    ...state,
    loading: true,
  })),

  on(loginSuccess, (state, authData: AuthData) => ({
    ...state,
    authData,
    loaded: true,
    loading: false,
    serverError: '',
  })),

  on(loginFailed, (state, { serverError }) => ({
    ...state,
    authData: undefined,
    loaded: true,
    loading: false,
    serverError,
  })),

  on(registration, (state) => ({
    ...state,
    loading: true,
  })),

  on(registrationSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(registrationFailed, (state, { serverError }) => ({
    ...state,
    authData: undefined,
    loaded: true,
    loading: false,
    serverError,
  }))
);
