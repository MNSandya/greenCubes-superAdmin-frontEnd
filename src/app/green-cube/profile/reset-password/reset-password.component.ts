import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService, SessionStorage } from 'ngx-webstorage';
import { SharedService } from 'src/app/utils/services/shared/shared.service';
import { CommonService } from 'src/app/utils/services/common/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
 public model: any = {};
 public show = false ;
 public showConfirmPassword = false;
 public showNewPassword = false;
 public newPasswordType = 'password';
 public confirmPasswordType = 'password';
  constructor( private sharedService: SharedService,
               private commonService: CommonService,
               private router: Router,
               private sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.sharedService.messageSource.next('resetpassword');
    // this.sharedService.set('currentRoute', { url: [], path: [''], activePath: 'Change Password' });

  }
  showHidePwd(type: string, identifier: string) {
    if (identifier === 'new') {
      this.newPasswordType = type;
      this.showNewPassword = !this.showNewPassword;
    } else {
      this.confirmPasswordType = type;
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  check() {
    if (this.model.confirmPassword === this.model.newPassword) {
      this.show = false ;

    }
  }
  onSubmit() {
    if (this.model.confirmPassword && this.model.newPassword) {
    if (this.model.confirmPassword !== this.model.newPassword) {
        this.show = true ;

      } else if (this.model.confirmPassword === this.model.newPassword) {
        this.commonService.postData('api/profile/changePassword', this.model).subscribe(response => {
          if (response.success) {
          this.sharedService.displaySnackbar('success', response.message);
          this.sessionStorage.clear();
          this.router.navigate(['/login']);
          }
        }, (error) => {
          this.sharedService.displaySnackbar('Retry', error.message);
          // this.snackBar.open( error.error.message, 'Retry', {
          //   duration: 2000,
          // });
        });

      }
    }
  }
  backToUserlist() {
    this.router.navigate(['/dashboard']);
  }
  space($event) {
  }

}


