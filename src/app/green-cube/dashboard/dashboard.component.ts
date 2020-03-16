import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { ClientDetails, AuthToken } from 'src/app/utils/models/common.model';
import { SessionStorage } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/utils/services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @SessionStorage('authenticationToken') public authenticationToken: AuthToken;
  public page = 1;
  public limit: any;
  public clientList = [];
  public searchkey: any;
  public search = '';
  public timeout: any;

  constructor(
    public commonService: CommonService,
    public cookieService: CookieService,
    public sharedService: SharedService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getClientList();
  }


  getClientList() {
    // const url = 'api/clients/?' + '&limit=' + this.limit + '&page=' + this.page + '&level=low' ;
    const url = 'api/clients';
    this.commonService.getData(url).subscribe(res => {
      if (res.success) {
        res.message.forEach(ele => {
          this.clientList.push(new ClientDetails(ele));
        });
      }
    }, (err) => {
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

  navigatetoClient(client) {
    console.log(client);
    // window.location.href = `${client.url}/dashboard`;
    const token = {token : this.authenticationToken.accessToken};
    this.commonService.postClient('http://34.93.62.160:3002/login/forward', token).subscribe(response => {
      if (response.success) {
        this.cookieService.set('clientId', client.id, 1, '', environment.hostUrl);
        this.cookieService.set( 'adminToken', response.payload.token, 1, '', environment.hostUrl);
        window.location.href = `http://localhost:4200/dashboard/`;
      }
    }, (err) => {
      this.sharedService.displaySnackbar('error', err.error.message);
    });
  }
}
