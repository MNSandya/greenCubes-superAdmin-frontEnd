import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SessionStorage } from 'ngx-webstorage';
import { Userdata } from 'src/app/utils/models/common.model';
import { SharedService } from 'src/app/utils/services/shared/shared.service';
import { CommonService } from 'src/app/utils/services/common/common.service';
// import { WarehouseDetails } from 'src/app/utils/models/devices.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
  public Rolearray = [];
  public permissionRolearray = [];
  @SessionStorage('userdata') public userdata: Userdata;
  public routeid: any;
  public model: any = {};
  public updatedata: any = {};
  public isLoadingResults = false;
  // public clientList = [];
  @SessionStorage('rights') public rightsarray;
  @SessionStorage('clientList') public clientList: any;

  permisson: any = {};
  constructor(
    public dialog: MatDialog,
    public sharedService: SharedService,
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
  ) {
    this.routeid = 0;
    this.routeid = this.activatedRoute.snapshot.paramMap.get('id');
    this.routeid = data.id;
  }

  ngOnInit() {
    this.sharedService.messageSource.next('users');
    // this.permisson = this.rightsarray.find(x => x.modulename === 'users');

    // this.getAllroles();
    if (this.userdata.level === undefined) {
      this.userdata.level = '0';
    }
    this.clientList = this.sharedService.getClientist();
    this.getDataByid();
    // this.Rolearray.forEach(el => {
    //   if (Number(el.level) >= Number(this.userdata.level)) {
    //     this.permissionRolearray.push(el);
    //   }
    // });

  }

  // edit data fetch
  getAllroles() {
    // tslint:disable-next-line: triple-equals
    this.commonService.getData('api/AllRoles')
      .subscribe(response => {
        if (response.success) {
          this.Rolearray = response.message;
        }
      }, (err) => {
      });
  }

  getDataByid() {
    // tslint:disable-next-line: triple-equals
    if (this.routeid != 0) {
      // tslint:disable-next-line: max-line-length
      // this.sharedService.set('currentRoute', { url: ['/user-management/list-users'], path: ['User Management'], activePath: 'Update User' });
      // this.isLoadingResults = true;
      this.commonService.getData('api/users/singleUser/' + this.routeid)
        .subscribe(response => {
          if (response.success) {
            // this.isLoadingResults = false;
            this.model = response.payload;
          }
        }, (err) => {
        });
    } else {
      // tslint:disable-next-line: max-line-length
      // this.sharedService.set('currentRoute', { url: ['/user-management/list-users'], path: ['User Management'], activePath: 'Create User' });
    }
  }

  // navigation back to user-mangemnt
  backToUserlist() {
    // this.router.navigate(['/user-management']);
    this.dialogRef.close();
  }

  // save and update data
  onSubmit(): void {
    // tslint:disable-next-line: triple-equals
    if (this.routeid == 0) {
      this.sharedService.display(true);
      this.commonService.postuserData('api/user', this.model).subscribe(response => {
        if (response.success) {
          this.sharedService.display(false);
          this.sharedService.displaySnackbar('success', response.message);
          // this.router.navigate(['user-management']);
          this.dialogRef.close('success');
        }
      }, (error) => {
        this.sharedService.display(false);
        this.sharedService.displaySnackbar('Retry', error.message);
        // this.snackBar.open( error.error.message, 'Retry', {
        //   duration: 2000,
        // });
      });
    } else {
      this.updatedata.userName = this.model.userName;
      this.updatedata.phone = this.model.phone;
      this.updatedata.email = this.model.email;
      this.updatedata.role = this.model.role;
      this.updatedata._id = this.model._id;
      this.updatedata.workPlace = this.model.workPlace;
      this.updatedata.warehouse = this.model.warehouse;
      this.sharedService.display(true);
      this.commonService.putData('api/user', this.updatedata).subscribe(response => {
        if (response.success) {
          this.sharedService.display(false);
          this.sharedService.displaySnackbar('success', 'Successfully updated');
          // this.router.navigate(['user-management']);
          this.dialogRef.close('success');
        }
      }, (error) => {
        this.sharedService.display(false);
        this.sharedService.displaySnackbar('error', error.message);
        // this.snackBar.open( error.error.message, 'Retry', {
        //   duration: 2000,
        // });
      });
    }
  }
  space(event) {
    if (this.model.userName === undefined || this.model.userName === null || this.model.userName === '') {
      event.preventDefault();
    }

  }

}
