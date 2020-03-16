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
@NgModule({
  declarations: [LoginComponent, HeaderComponent, LayoutComponent],
  imports: [
    CommonModule,
    CommonRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    UtilsModule,
    GreenCubeModule
  ],
  exports : [HeaderComponent]
})
export class AppCommonModule { }
