import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, merge, of as observableOf } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SessionStorage } from 'ngx-webstorage';
import { Userdata } from 'src/app/utils/models/common.model';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { SharedService } from 'src/app/utils/services/shared/shared.service';
import { ConfirmationDialogComponent } from 'src/app/common/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @SessionStorage('userdata') public userdata: Userdata;
  public level: any;
  public errormsg: boolean;
  public userdisplaydata: Userdata;
  public userlistarray = new MatTableDataSource([]);
  public userlist: Userlist | null;
  public itemscount: number;
  public p: number;
  public disable = false;
  public limit: any;
  public page: any;
  public search: any;
  public resultsLength = 0;
  public displayedColumns: string[] = ['position', 'name', 'email', 'mobilenumber', 'role', 'action'];
  public deleterow = [];
  public direction: any;
  public timeout = null;
  public searchkey: any;
  public deletearray = [];
  public isLoadingResults = false;
  @SessionStorage('rights') public rightsarray;
  // permisson = Permissons ;
  permisson: any = {};
  constructor(
    private commonService: CommonService,
    private router: Router,
    private httpclient: HttpClient,
    public dialog: MatDialog,
    private sharedService: SharedService,
  ) {
    this.page = 0;
    this.limit = 10;
  }

  ngOnInit() {
    this.sharedService.messageSource.next('users');
    // this.permisson = this.rightsarray.find(x => x.modulename === 'users');
    // this.sharedService.set('currentRoute', { url: [''], path: [''], activePath: 'User Management' });
    // if (this.permisson.write === false && this.permisson.delete === false) {
    this.displayedColumns = ['position', 'name', 'email', 'mobilenumber', 'role', 'action'];
    // }
    //  this.permisson.write = false ;
    //   this.permisson.delete = false ;
  }
  ngAfterViewInit() {
    if (Number(this.userdata.level) === 3) {
      this.disable = true;
    }
    this.refreshData(); // fetech userdata
  }

  // pagiantion
  pageChanged(event) {
    this.userlistarray.data = [];
    this.page = event;
    this.refreshData();
  }
  // check box actions
  deleteRowSelection(event, id) {

    if (event.target.checked === true) {
      this.deleterow.push(id);
    } else {
      this.deleterow = this.deleterow.filter(x => x !== id);
    }
  }
  // navigation to create or edit user screen
  createUser(id) {
    // if (id !== 0) {
    //   id = id.trim();
    // }
    // this.router.navigate(['/user-management/create-edit/' + id]);
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '600px',
      height: '380px',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.page = 1;
        this.refreshData();
      }
    });
  }

  // clear the check boxes
  cancelselction() {
    this.deleterow = [];
    this.userlistarray.data.forEach((el, Index) => {
      el.checked = false;
    });
  }

  // search user
  searchUser(key) {
    if (key === null || key === undefined || key === '') {
      this.search = '';
      this.page = 1;
      this.refreshData();
    } else {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.search = this.searchkey;
        this.page = 1;
        this.refreshData();
      }, 1000);
    }
  }
  // single row delete
  deleteuser(id) {
    const msgnew = 'Are you sure to delete user?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        Data: msgnew
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'success') {
          this.deletearray = [];
          this.deletearray.push({ _id: id });
          this.deleteDatacall(this.deletearray);
        }

      }
    });
  }
  // multiple row delete
  multideleterows() {
    const msgnew = 'Are you sure to delete user?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        Data: msgnew
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'success') {
          this.deletearray = [];
          this.deleterow.forEach((el, index) => {
            this.deletearray.push({ _id: el });
          });
          this.deleteDatacall(this.deletearray);
        }

      }
    });

  }
  deleteDatacall(data) {
    this.sharedService.display(true);
    this.commonService.deleteData('api/user', data).subscribe(res => {
      if (res.success) {
        this.sharedService.display(false);
        this.sharedService.displaySnackbar('success', res.message);
        this.refreshData();
        this.deleterow = [];
      }

    }, err => {
      this.sharedService.display(false);
    });

  }

  // Load user data
  refreshData() {
    // tslint:disable-next-line: no-use-before-declare
    this.sharedService.display(true);
    this.userlist = new Userlist(this.httpclient, this.commonService);
    merge(this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (this.search === undefined) {
            this.search = '';
          }

          if (this.sort.direction === 'desc' || this.sort.direction === '') {
            this.direction = 0;
          } else if (this.sort.direction === 'asc') {
            this.direction = 1;
          }
          // tslint:disable-next-line: no-non-null-assertion
          return this.userlist!.getRepoIssues(this.search,
            this.direction, this.page, this.limit);
        }),
    )
      .subscribe((response) => {
        if (response.success) {
          this.sharedService.display(false);
          this.isLoadingResults = false;
          this.userlistarray.data = response.payload;
          this.resultsLength = this.userlistarray.data.length;
          if (this.userlistarray.data.length !== 0) {
            this.errormsg = false;
            this.userlistarray.data.forEach(el => {
              if (el.level < this.userdata.level) {
                el.edit = false;
              } else {
                el.edit = true;
              }
              if (this.deleterow.length !== 0) {
                this.deleterow.forEach(del => {
                  if (el._id.toString() === del) {
                    el.checked = true;
                  }
                });
              }
            });

          } else {
            this.errormsg = true;
          }
        }
      }, (err) => {
          this.sharedService.display(false);
      });
  }
  space(event) {
    if (this.searchkey === undefined || this.searchkey === null || this.searchkey === '') {
      event.preventDefault();
    }
  }

}
// class for refresh data to keep code clean
export class Userlist {
  public userParams: any = {};
  constructor(private http: HttpClient,
    private commonService: CommonService) { }

  getRepoIssues(searchString: string, sort: any, page: number, limit: number): Observable<any> {
    this.userParams.limit = limit;
    this.userParams.page = page;
    this.userParams.sort = sort;
    this.userParams.searchString = searchString;

    // return this.commonService.getData('api/users?limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchString=' + searchString)
    return this.commonService.getData('api/user')
      .pipe(
        (data: any[]) => {
          return data;
        }
      );
  }

}



