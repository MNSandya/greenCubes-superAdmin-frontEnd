import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { SessionStorageService, SessionStorage } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private sessionStorage: SessionStorageService
  ) { }
  errorHandler(err: any) {

    if (err.status === 401) {
      // tslint:disable-next-line: no-string-literal
      this.snackBar.open('Session Time out', 'Login again', window['snackBarConfig']);
      this.sessionStorage.clear();
      this.router.navigate(['']);
    }
  }
}
