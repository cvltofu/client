import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/classes/auth.guard';
import { LoginAuthGuard } from './components/classes/login-auth.guard';

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
    canActivate: [LoginAuthGuard],
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
