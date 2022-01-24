import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { environment } from '../environments/environment';
import AppRoutingModule from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosModule } from './components/todos/todos.module';
import { UsersModule } from './components/users/users.module';
import { HomeModule } from './components/home/home.module';
import { NotFoundModule } from './components/not-found/not-found.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { AuthStoreModule } from './store/auth-store/auth-store.module';
import { TokenInterceptor } from './store/auth-store/interceptors/token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    NotFoundModule,
    TodosModule,
    UsersModule,
    NavbarModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    AuthStoreModule,
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
