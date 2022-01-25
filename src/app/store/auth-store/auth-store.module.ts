import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { initAuth } from './store/auth.actions';

import { AuthEffects } from './store/auth.effects';
import { authReducer, AUTH_FEATURENAME } from './store/auth.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (request) => request as any,
      },
    }),
    StoreModule.forFeature(AUTH_FEATURENAME, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStoreModule {
  constructor(store$: Store) {
    store$.dispatch(initAuth());
  }
}
