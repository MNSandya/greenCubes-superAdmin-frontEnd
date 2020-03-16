import { Component, OnInit } from '@angular/core';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { Userdata } from 'src/app/utils/models/common.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public url = '';
  @SessionStorage('userdata') public userdata: Userdata;

  constructor(
    public sessionStorage: SessionStorageService,
    public router: Router
  ) { }

  ngOnInit() {
    this.url = '../../../../assets/images/deafult.png';
  }

  Logout() {
    this.sessionStorage.clear();
    this.router.navigate(['/login']);

  }
  profile() {
    // this.sharedService.messageSource.next('profile');
    // this.router.navigate(['/user/profile']);

  }

}
