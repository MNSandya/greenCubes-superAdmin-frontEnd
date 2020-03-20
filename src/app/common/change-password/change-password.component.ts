import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { SharedService } from 'src/app/utils/services/shared/shared.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public showConfirmPassword = false;
  public showNewPassword = false;
  public newPasswordType = 'password';
  public confirmPasswordType = 'password';
  public isEqual=false;
  constructor(public formBuilder: FormBuilder, private commonService: CommonService, private router: Router,
              private activateRoute: ActivatedRoute , private sharedService: SharedService) { }

  ngOnInit() {
    this.isTokenExist();
    this.formValidation();
  }

  isTokenExist(): void {
    if (!this.activateRoute.snapshot.params.token) {
      this.router.navigate(['']);
    }
  }

  passwordConfirming(c:FormGroup): { invalid: boolean } {

    if (c.get('newPassword').value !== c.get('confirmPassword').value) {
        return {invalid : true};
    }else{
      return null
    }
}
  /**
   * @method - formValidation()
   * @description - the following form validation is life-cycle event, create the login form with validations set for  login credentials.
   * @author amitha.shetty
   *
   */
  formValidation(): void {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required,Validators.minLength(8),Validators.pattern('.*[$%^&*()#@!].*')]],
      confirmPassword: ['', [Validators.required]],
      token: this.activateRoute.snapshot.params.token
    },
    {validator:this.passwordConfirming}
    );
  }

  /**
   * @method - validationControl()
   * @description - the following validationControl() method is used return  user credentials so it make easy to
   * access the form controls on the HTML form.
   * @author amitha.shetty
   */

  get validationControl() { return this.changePasswordForm.controls; }

  showHidePwd(type: string, identifier: string) {
    if (identifier === 'new') {
      this.newPasswordType = type;
      this.showNewPassword = !this.showNewPassword;
    } else {
      this.confirmPasswordType = type;
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  /**
   * @method  onSubmit()
   * @description -the following onSubmit() method is used send forgot-password details , receive reset password link if valid user.
   * POST(postData) method to get the success mesaage  with  query params as the forgot-password credentials.
   * @author amitha.shetty
   */
  onSubmit(): void {
    
      this.commonService.postData('api/resetPassword', this.changePasswordForm.value).subscribe(response => {
        if (response.success) {
          this.sharedService.displaySnackbar('success', 'Password set successfully');
          this.router.navigate(['']);
        }
      }, (err) => {
      });
    
  }
}
