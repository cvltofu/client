import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import AppRoutingModule from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosModule } from './components/todos/todos.module';
import { UsersModule } from './components/users/users.module';
import { HomeModule } from './components/home/home.module';
import { NotFoundModule } from './components/not-found/not-found.module';

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
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
