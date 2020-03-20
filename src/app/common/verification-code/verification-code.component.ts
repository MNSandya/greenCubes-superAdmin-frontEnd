import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../utils/services/common/common.service';
import {SharedService} from '../../utils/services/shared/shared.service';
import { VerifyOTP, ForgotPwdResponse } from '../../utils/models/common.model';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { element } from 'protractor';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {
  @ViewChild('input1', { static: true }) inputEl: ElementRef;
  public otpData: Array<string> = [];
  public verifyOTPData = new VerifyOTP();
  @SessionStorage('forgotPwdMail') public forgotPwdMail: ForgotPwdResponse;
  constructor(private router: Router, private commonService: CommonService, private storage: SessionStorageService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.isUserIdExist();
  }
  isUserIdExist(): void {
    if (this.forgotPwdMail) {
      this.verifyOTPData.id = this.forgotPwdMail.userId;
    } else {
      this.router.navigate(['']);
    }
  }

  /**
   * @method getSiblingInput()
   * @description - the following getSiblingInput() method is used get sibling input element
   * @param event - event is actually an object containing information about the action that just happened.
   * @author amitha.shetty
   */
  getSiblingInput(event, key): void {
    if (event.code.includes('Digit') || (event.keyCode >= 96 && event.keyCode <= 105) ) { // allow only for numbers
      // tslint:disable-next-line: no-shadowed-variable
    const element = event.srcElement.nextElementSibling; // get the sibling element
    if (element === null) { // check if its null
        return;
      } else {
        element.focus(); // focus if not null
      }
    }
    if (event.keyCode === 8) {
      if (key > 0 && !event.target.value) {
        const elementback = event.srcElement.form[key - 1] ;
        elementback.focus();
      }
    }
  }

  resendCode(): void {
    const requestData = {
      email: this.forgotPwdMail.email
    };
    this.commonService.postData('api/forgotPassword', requestData).subscribe(response => {
      if (response.success) {
        this.sharedService.displaySnackbar('success', 'Verification code has been sent successfully');
        this.forgotPwdMail.userId = response.userId;
        this.isUserIdExist();
      }
    }, (err) => {
      this.sharedService.displaySnackbar('error', err.error.message);
    });
  }

  /**
   * @method onSubmit()
   * @description - the following onSubmit() method is used submit otp details returns response if valid otp.
   * POST(postData) method to get the otp details with  query params as the otp.
   * @author amitha.shetty
   */
  onSubmit(): void {
    this.verifyOTPData.OTP = '';
    this.otpData.filter(ele => {
      this.verifyOTPData.OTP += ele.toString();
    });
    this.commonService.postData('api/verifyOTP', this.verifyOTPData).subscribe(response => {
      if (response.success) {
        this.router.navigate(['change-password/' + response.token]);
        this.storage.clear('forgotPwdMail');
      }
    }, (err) => {
      this.sharedService.displaySnackbar('error', err.error.message);
    });
  }
}
