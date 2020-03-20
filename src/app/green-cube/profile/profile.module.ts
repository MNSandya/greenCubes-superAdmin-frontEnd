import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {ProfileRoutingModule } from './profile-routing.module';
import {FormsModule} from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component' ;

@NgModule({
  declarations: [ProfileComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }
