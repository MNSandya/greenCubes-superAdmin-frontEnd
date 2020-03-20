import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GreenCubeRoutingModule } from './green-cube-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGaurdService } from '../utils/services/guards/auth-gaurd.service';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { AgmCoreModule } from '@agm/core';
import { UpdateClientComponent } from './clients/update-client/update-client.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [DashboardComponent, AddClientComponent, UpdateClientComponent],
  imports: [
    CommonModule,
    GreenCubeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBZWJnxZ4fWLu0Lid7AC5Y9T0dnGuBZzxs'
    })
  ],
  providers: [AuthGaurdService],
  entryComponents: [UpdateClientComponent]

})
export class GreenCubeModule { }
