import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared/auth-guard/auth.guard';
import {RegisterComponent} from './page/register/register.component';
import {LoginComponent} from './page/login/login.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';

const routes: Routes = [

  {path: '', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
