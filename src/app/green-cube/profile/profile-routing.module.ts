import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile/profile.component' ;
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGaurdService as AuthGuard } from '../../utils/services/guards/auth-gaurd.service';

const routes: Routes = [
  {
  path: '',
  children: [
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]

    },
    {
      path: 'change-password',
      component: ResetPasswordComponent,
      canActivate: [AuthGuard]
    },
 ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
