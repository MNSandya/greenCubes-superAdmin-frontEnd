import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { SharedService } from 'src/app/utils/services/shared/shared.service';
import { SessionStorage } from 'ngx-webstorage';
import { AuthToken, Userdata } from 'src/app/utils/models/common.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: FormGroup;
  public passwordType = 'password';
  public showPassword = false;

  @SessionStorage('userdata') public userdata: Userdata;
  @SessionStorage('authenticationToken') public authenticationToken: AuthToken;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public commonService: CommonService,
    public sharedService: SharedService,
    public cookieService: CookieService
  ) { }

  ngOnInit() {
    this.formValidation();
  }

  /**
   * @method - formValidation()
   * @description - the following form validation is life-cycle event, create the login form with validations set for  login credentials.
   *
   */
  formValidation(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', Validators.required]
    });
  }
  /**
   * @method - validationControl()
   * @description - the following validationControl() method is used return  user credentials so it make easy to
   * access the form controls on the HTML form.
   */

  get validationControl() { return this.login.controls; }

  showHidePwd(type: string): void {
    this.passwordType = type;
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    // this.router.navigate(['dashboard']);
    this.cookieService.deleteAll('/', environment['hostUrl']);
    this.commonService.postData('api/login', this.login.value).subscribe(response => {
      if (response.success) {
        this.storeAuthToken(response.payload);
        this.storeUserData (response.payload.user);
        // this.sharedService.rolesRight(response.payload.user.role);
        this.router.navigate(['dashboard']);
      }
    }, (err) => {
      this.sharedService.displaySnackbar('error', err.error.message);
    });
  }

  /**
   * @method  storeAuthToken()
   * @description - the following storeAuthToken() method is used store authentication token and token type.
   * @uses AuthToken: class to convert the data obtained from login to the required format for store purpose
   */
  storeAuthToken(data: AuthToken): void {
    this.authenticationToken = new AuthToken(data);
  }

  storeUserData(data: Userdata): void {
    this.userdata = new Userdata(data);
  }
}
