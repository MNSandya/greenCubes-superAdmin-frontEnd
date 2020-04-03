import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { AuthToken } from '../../models/common.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

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
    if (cookieExists && this.cookieService.get('adminToken') !== '') {
      const adminToken = this.cookieService.get('adminToken');
      this.adminName = this.cookieService.get('adminName');

      this.authenticationToken = new AuthToken({
        token: adminToken,
        tokenType: 'JWT',
      });
      this.cookieService.set('clientId', '', 1, '/', environment['hostUrl'], false, 'Lax');
      this.cookieService.set('adminName', '', 1, '/', environment['hostUrl'], false, 'Lax');
      this.cookieService.set('clientToken', '', 1, '/', environment['hostUrl'], false, 'Lax');
      this.cookieService.set('adminToken', '', 1, '/', environment['hostUrl'], false, 'Lax');
      this.cookieService.deleteAll('/', environment['hostUrl']);
    }
    if (!this.authenticationToken) {
      this.router.navigate(['login']);
      // this.cookieService.delete('adminToken');
      this.cookieService.set('adminToken', '', 1, '/', environment['hostUrl'], false, 'Lax');
      this.cookieService.deleteAll('/', environment['hostUrl']);
      return false;
    }
    return true;
  }
}
