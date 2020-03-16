import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { AuthToken } from '../../models/common.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  @SessionStorage('authenticationToken') public authenticationToken: AuthToken;

  constructor(
    public router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authenticationToken) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
