import { Component, OnInit } from '@angular/core';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { Userdata } from 'src/app/utils/models/common.model';
import { Router } from '@angular/router';
import { SharedService } from '../../utils/services/shared/shared.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public url = '';
  @SessionStorage('userdata') public userdata: Userdata;
  active: any;
  matTooltipdsiabled: boolean;
  selection = '';
  public clientIcon = '';
  public userIcon = '';

  constructor(
    public sessionStorage: SessionStorageService,
    public router: Router,
    public sharedService: SharedService,
    public cookieService: CookieService
  ) { }

  ngOnInit() {
    // this.clientIcon = '../../../assets/images/dashboard icons/clients_icon.svg';
    // this.userIcon = '../../../assets/images/dashboard icons/user_icon_inactive.svg';
    this.url = '../../../../assets/images/deafult.png';
    this.sharedService.messageSource.subscribe((message: string) => {
      if (message !== '' && message !== null) {
        this.selection = message;
        sessionStorage.setItem('selection', this.selection);

        if (this.selection === 'dashboard') {
          this.userIcon = '../../../assets/images/dashboard icons/user_icon_inactive.svg';
          this.clientIcon = '../../../assets/images/dashboard icons/clients_icon.svg';
        } else {
          this.userIcon = '../../../assets/images/dashboard icons/user_icon.svg';
          this.clientIcon = '../../../assets/images/dashboard icons/clients_icon_inactive.svg';
        }
      }
    });
    if (!sessionStorage.getItem('selection')) {
      this.selection = 'users';
      sessionStorage.setItem('selection', this.selection);
    } else {
      this.selection = sessionStorage.getItem('selection');
      if (this.selection === 'dashboard') {
        this.userIcon = '../../../assets/images/dashboard icons/user_icon_inactive.svg';
        this.clientIcon = '../../../assets/images/dashboard icons/clients_icon.svg';
      } else {
        this.userIcon = '../../../assets/images/dashboard icons/user_icon.svg';
        this.clientIcon = '../../../assets/images/dashboard icons/clients_icon_inactive.svg';
      }
    }
  }

  Logout() {
    this.sessionStorage.clear();
    this.cookieService.delete('adminToken');
    this.router.navigate(['/login']);
  }
  profile() {
    this.sharedService.messageSource.next('profile');
    this.router.navigate(['/user/profile']);

  }
  changePassword() {
    this.router.navigate(['/user/change-password']);
  }
  hoverListItem(opportunity, type) {
    if (opportunity === 'mousein') {
      this.active = type;
      this.matTooltipdsiabled = false;
    } else if (opportunity === 'mouseout') {
      this.active = '';
      this.matTooltipdsiabled = true;
    }
  }

  type(data) {
    this.active = '';
    if (data === 'dashboard') {
      this.router.navigate(['/dashboard']);
    } else if (data === 'users') {
      this.router.navigate(['/user-management']);
    }
  }

}
