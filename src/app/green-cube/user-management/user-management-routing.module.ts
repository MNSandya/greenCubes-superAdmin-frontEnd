import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { AuthGaurdService as AuthGuard } from '../../utils/services/guards/auth-gaurd.service';

const routes: Routes = [
  {
  path: '',
  children: [
    {
      path: 'list-users',
      component: ListUsersComponent,
      canActivate: [AuthGuard]
    },
    // {
    //   path: 'create-edit/:id',
    //   component: CreateEditUserComponent,
    //   canActivate: [AuthGuard]
    // },

    {
      path: '',
      redirectTo: 'list-users',
      pathMatch: 'full'
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
