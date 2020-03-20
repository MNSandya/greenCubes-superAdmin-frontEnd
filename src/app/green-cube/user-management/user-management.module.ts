import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule, MatSnackBarModule, MatSortModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [ListUsersComponent, CreateEditUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    UserManagementRoutingModule,
    NgSelectModule,
    MatMenuModule,
    MDBBootstrapModule.forRoot()
  ],
  entryComponents: [CreateEditUserComponent]
})
export class UserManagementModule { }
