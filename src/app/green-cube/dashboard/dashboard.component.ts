import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { ClientDetails, AuthToken, MapMarker, Userdata } from 'src/app/utils/models/common.model';
import { SessionStorage } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/utils/services/shared/shared.service';
import { Router } from '@angular/router';
import { MouseEvent, AgmMap, LatLngBounds } from '@agm/core';
import { ConfirmationDialogComponent } from '../../common/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { UpdateClientComponent } from '../clients/update-client/update-client.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @SessionStorage('authenticationToken') public authenticationToken: AuthToken;
  @ViewChild('AgmMap', { static: false }) agmMap: AgmMap;
  @SessionStorage('userdata') public userdata: Userdata;

  public page = 1;
  public limit: any;
  public clientList = [];
  public searchkey: any;
  public search = '';
  public timeout: any;

  // google maps zoom level
  public zoom;

  // initial center position for the map
  public lat;
  public lng;

  public markers: MapMarker[] = [];

  public markericon: any;

  constructor(
    public commonService: CommonService,
    public cookieService: CookieService,
    public sharedService: SharedService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.markericon = {
      url: '../../../assets/images/dashboard icons/marker/pin.png',
      scaledSize: {
        width: 25,
        height: 40
      }
    };
    this.sharedService.messageSource.next('dashboard');
    this.getClientList();
    this.getFacilityDetails();
  }

  ngAfterViewInit() {
    this.agmMap.mapReady.subscribe(map => {
      const bounds = new google.maps.LatLngBounds();
      for (const mm of this.markers) {
        bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
  }
      map.fitBounds(bounds);
    });
  }

  // get all facilities
  getFacilityDetails() {
    this.commonService.getData(`api/facility`).subscribe(res => {
      if (res.success) {
        this.markers = [];
        res.payload.forEach(ele => {
          ele.facility.forEach(el => {
            this.markers.push(new MapMarker(el));
          });
        });
        this.sharedService.display(false);
      }
    }, (err) => {
      this.sharedService.display(false);
    });
  }

  getClientList() {
    // const url = 'api/clients/?' + '&limit=' + this.limit + '&page=' + this.page + '&level=low' ;
    // let markerdata;
    if (!this.search) {
      this.search = '';
    }
    this.sharedService.display(true);
    const url = `api/clients?searchString=${this.search}`;
    this.clientList = [];
    // const url = 'api/clients';
    this.commonService.getData(url).subscribe(res => {
      if (res.success) {
        this.clientList = [];
        res.message.forEach(ele => {
          this.clientList.push(new ClientDetails(ele));
        });
        this.sharedService.setClientList(this.clientList);
        this.sharedService.display(false);
      }
    }, (err) => {
      this.sharedService.display(false);
    });
  }

  searchClient(key) {
    if (key === null || key === undefined || key === '') {
      this.search = '';
      this.page = 1;
      this.getClientList();
    } else {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.search = this.searchkey;
        this.page = 1;
        this.getClientList();
      }, 500);
    }
  }

  createClient() {
    this.router.navigate(['/dashboard/add-client']);
  }

  space(event) {
    if (this.searchkey === undefined || this.searchkey === null || this.searchkey === '') {
      event.preventDefault();
    }
  }

  // redirecting to the selected client
  navigateToClient(client) {
    // window.location.href = `${client.url}/dashboard`;
    this.sharedService.display(true);
    const token = { token: this.authenticationToken.accessToken };
    this.commonService.getClient(`${client.backendUrl}/api/login/forword`).subscribe(response => {
      if (response.success) {
        this.sharedService.display(false);
        this.cookieService.set('clientId', response.payload.user.role, 1, '/', environment['hostUrl'], false, 'Lax');
        this.cookieService.set('adminName', this.userdata.userName, 1, '/', environment['hostUrl'], false, 'Lax');
        this.cookieService.set('clientToken', response.payload.token, 1, '/', environment['hostUrl'], false, 'Lax');
        this.cookieService.set('adminToken', this.authenticationToken.accessToken, 1, '/', environment['hostUrl'], false, 'Lax');
        // window.location.href = `http://localhost:4200/dashboard/`;
        window.location.href = `${client.frontendUrl}/dashboard`;
      }
    }, (err) => {
      this.sharedService.display(false);
      this.sharedService.displaySnackbar('error', err.error.message);
    });
  }

  deletepopup(e, data) {
    e.stopPropagation();
    e.preventDefault();
    const msgnew = 'Are you sure to delete warehouse?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        Data: msgnew
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'success') {
          this.deleteClient(data);
        }

      }
    });
  }
  deleteClient(data) {
    const requestJson = {
      _id: data
    };
    this.sharedService.display(true);
    this.commonService.deleteData('api/clients', requestJson).subscribe(res => {
      if (res.success) {
        this.sharedService.display(false);
        this.sharedService.displaySnackbar('success', 'Deleted Successfully');
        this.getClientList();
      }

    }, err => {
      this.sharedService.display(false);
    });

  }

  updateClient(e, obj) {
    e.stopPropagation();
    e.preventDefault();
    const msgnew = 'Are you sure to delete warehouse?';
    const dialogRef = this.dialog.open(UpdateClientComponent, {
      width: '400px',
      data: {
        id: obj.id,
        name: obj.name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'success') {
          this.getClientList();
        }

      }
    });
  }

  // show info window
  showInfo(m) {
    m.info = true;
  }

  // hide info window
  hideInfo(m) {
    m.info = false;
  }
}
