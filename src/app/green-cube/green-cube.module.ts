import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GreenCubeRoutingModule } from './green-cube-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule} from '@angular/forms';
import { AuthGaurdService } from '../utils/services/guards/auth-gaurd.service';
import { AddClientComponent } from './clients/add-client/add-client.component';


@NgModule({
  declarations: [DashboardComponent, AddClientComponent],
  imports: [
    CommonModule,
    GreenCubeRoutingModule,
    FormsModule
  ],
  providers: [AuthGaurdService]
})
export class GreenCubeModule { }
