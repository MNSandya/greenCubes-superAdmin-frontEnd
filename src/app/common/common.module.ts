import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule} from '@angular/material/menu';
import { LayoutComponent } from './layout/layout.component';
import { UtilsModule } from '../utils/utils.module';
import { GreenCubeModule } from '../green-cube/green-cube.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { MatTooltipModule } from '@angular/material/tooltip';

// import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    LayoutComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    VerificationCodeComponent
  ],
  imports: [
    CommonModule,
    CommonRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    UtilsModule,
    GreenCubeModule,
    FormsModule,
    MatTooltipModule
  ],
  exports : [HeaderComponent, LayoutComponent]
})
export class AppCommonModule { }
