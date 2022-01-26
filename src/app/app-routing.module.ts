import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DEFAULT_ROUTER_FEATURENAME, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './components/classes/auth.guard';
import { GuestGuard } from './components/classes/guest.guard';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TodosComponent } from './components/todos/todos/todos.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserRegistrationComponent } from './components/users/user-registration/user-registration.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'registration',
    component: UserRegistrationComponent,
  },
  {
    path: 'login',
    component: UserLoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerReducer),
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
