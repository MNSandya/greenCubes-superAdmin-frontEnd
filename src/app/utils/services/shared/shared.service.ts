import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';
import { SessionStorage } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';
import { SnackBarMessage } from '../../models/shared.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  @SessionStorage('rights') public rightsarray: any;
  @SessionStorage('clientList') public clientList: any;

  rights: any = [];
  // clientList = [];
  messageSource: BehaviorSubject<string> = new BehaviorSubject('');
  userdataupdate: BehaviorSubject<string> = new BehaviorSubject('');
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public messageContent = new SnackBarMessage();
  constructor(
    public commonService: CommonService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  rolesRight(id) {
    this.commonService.getData('api/singleRole/' + id)
     .subscribe(response => {
      if (response.success) {
        this.rights = response.message.modules;
        this.rights.forEach(element => {
          if (element.permission === 0) {
            element.read = false;
            element.write = false ;
            element.delete = false;
          } else  if (element.permission === 1) {
            element.read = true;
            element.write = false ;
            element.delete = false;
          } else  if (element.permission === 2) {
            element.read = false;
            element.write = true ;
            element.delete = false;
          } else  if (element.permission === 3) {
            element.read = true;
            element.write = true ;
            element.delete = false;
          } else  if (element.permission === 4) {
            element.read = false;
            element.write = false ;
            element.delete = true;
          } else  if (element.permission === 5) {
            element.read = true;
            element.write = false ;
            element.delete = true;
          } else  if (element.permission === 6) {
            element.read = false;
            element.write = true ;
            element.delete = true;
          }  else  if (element.permission === 7) {
            element.read = true;
            element.write = true ;
            element.delete = true;
          }
      });
        this.rightsarray = this.rights ;
        this.router.navigate(['dashboard']);
        }
      }, (err) => {
      });

}
displaySnackbar(type: string, content: string): void {
  this.messageContent.body = content;
  this.openSnackbar(new SnackBarMessage(this.messageContent, type));
}
openSnackbar(message: SnackBarMessage): void {
  // tslint:disable-next-line: no-string-literal
  this.snackBar.open(message.body, message.title, window['snackBarConfig']);
}

setClientList(data) {
  this.clientList = data;
}
getClientist() {
  return this.clientList;
}

display(value: boolean, counter?: string) {
  if (value !== undefined) {
    this.status.next(value);
  }
}
}
