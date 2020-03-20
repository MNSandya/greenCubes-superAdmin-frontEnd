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

  constructor(
    public router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const cookieExists: boolean = this.cookieService.check('adminToken');
    if (cookieExists) {
      const adminToken = this.cookieService.get('adminToken');

      this.authenticationToken = new AuthToken({
        token: adminToken ,
        tokenType: 'JWT',
        });
      this.cookieService.delete('adminToken');
    }
    if (!this.authenticationToken) {
      this.router.navigate(['login']);
      this.cookieService.delete('adminToken');
      return false;
    }
    return true;
  }
}
