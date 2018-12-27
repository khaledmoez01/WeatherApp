import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { WeatherComponent } from './weather/weather.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
{
  path: 'auth/signup',
  component: SignupComponent
},
{
  path: 'auth/signin',
  component: SigninComponent
},
{
  path: 'weather',
  component: WeatherComponent,
  canActivate: [AuthGuardService]
},
{
  path: '',
  redirectTo: 'weather',
  pathMatch: 'full'    
},
{
  path: '**',
  redirectTo: ''
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
