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
    },
    {
      path: 'user',
      loadChildren: () => import('./green-cube/profile/profile.module').then(m => m.ProfileModule),
      // canActivate: [AuthGuard],
      data: { routename: 'profile'}
    }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [{
    path: 'user-management',
    loadChildren: () => import('./green-cube/user-management/user-management.module').then(m => m.UserManagementModule),
    // canActivate: [AuthGuard],
    data: { routename: 'users'}
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
