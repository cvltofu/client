import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState, AUTH_FEATURENAME } from './auth.reducer';

const getFeature = createFeatureSelector<AuthState>(AUTH_FEATURENAME);

export const getLoading = createSelector(getFeature, (state) => state.loading);

export const getLoaded = createSelector(getFeature, (state) => state.loaded);

export const getServerError = createSelector(
  getFeature,
  (state) => state.serverError
);

export const getAuthData = createSelector(getFeature, (state) => {
  console.log(state);

  return state.authData;
});

export const getAccessToken = createSelector(getAuthData, (authData) => {
  console.log(authData);

  return authData?.accessToken;
});

export const isAuth = createSelector(
  getAccessToken,
  (accessToken) => !!accessToken
);
