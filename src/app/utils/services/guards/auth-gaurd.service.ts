import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { AuthToken } from '../../models/common.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  @SessionStorage('authenticationToken') public authenticationToken: AuthToken;
  @SessionStorage('adminName') public adminName;

  constructor(
    public router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const cookieExists: boolean = this.cookieService.check('adminToken');
    if (cookieExists) {
      const adminToken = this.cookieService.get('adminToken');
      this.adminName = this.cookieService.get('adminName');

      this.authenticationToken = new AuthToken({
        token: adminToken,
        tokenType: 'JWT',
      });
      this.cookieService.delete('adminToken', '/');
      this.cookieService.delete('clientToken', '/');
      this.cookieService.delete('clientId', '/');
      this.cookieService.delete('adminName', '/');
      this.cookieService.deleteAll('/');
    }
    if (!this.authenticationToken) {
      this.router.navigate(['login']);
      // this.cookieService.delete('adminToken');
      this.cookieService.deleteAll('/');
      return false;
    }
    return true;
  }
}
