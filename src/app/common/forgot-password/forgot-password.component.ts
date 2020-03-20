import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../../utils/services/shared/shared.service';
import { CommonService } from '../../utils/services/common/common.service';
import { ForgotPwdResponse } from '../../utils/models/common.model';

import { SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  @SessionStorage('forgotPwdMail') public forgotPwdMail: ForgotPwdResponse;
  constructor(private router: Router, public formBuilder: FormBuilder,
              private commonService: CommonService, private sharedService: SharedService ) { }

  ngOnInit() {
    this.formValidation();
  }
  /**
   * @method - formValidation()
   * @description - the following form validation is life-cycle event, create the login form with validations set for  login credentials.
   * @author amitha.shetty
   *
   */
  formValidation(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
  /**
   * @method - validationControl()
   * @description - the following validationControl() method is used return  user credentials so it make easy to
   * access the form controls on the HTML form.
   * @author amitha.shetty
   */

  get validationControl() { return this.forgotPasswordForm.controls; }
  /**
   * @method  onSubmit()
   * @description -the following onSubmit() method is used send forgot-password details , receive reset password link if valid user.
   * POST(postData) method to get the success mesaage  with  query params as the forgot-password credentials.
   * @author amitha.shetty
   */
  onSubmit(): void {
    this.commonService.postData('api/forgotPassword', this.forgotPasswordForm.value).subscribe(response => {
      if (response.success) {
        this.sharedService.displaySnackbar('success', 'Verification code has been sent successfully');
        this.forgotPwdMail = new ForgotPwdResponse(this.forgotPasswordForm.value.email, response.userId);
        this.router.navigate(['verification-code']);
      }
    }, (err) => {
      this.sharedService.displaySnackbar('error', err.error.message);
    });
  }

}
