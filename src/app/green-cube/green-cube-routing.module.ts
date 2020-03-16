import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGaurdService as AuthGuard } from '../utils/services/guards/auth-gaurd.service';
import { AddClientComponent } from './clients/add-client/add-client.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: DashboardComponent,
      // canActivate: [AuthGuard]
    },
    {
      path: 'add-client',
      component: AddClientComponent,
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GreenCubeRoutingModule { }
