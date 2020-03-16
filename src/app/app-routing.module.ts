import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './common/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./common/common.module').then(m => m.AppCommonModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: 'dashboard',
      loadChildren: () => import('./green-cube/green-cube.module').then(m => m.GreenCubeModule)
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
