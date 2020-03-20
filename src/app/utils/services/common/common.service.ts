import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor( private httpService: HttpService, private errorService: ErrorService) { }

  getData(url: string): any {
    return this.httpService.get(url)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(error => {
          return this.errorHandler(error);
        })
      );
  }

  postData(url: string, data?: any): any {
    return this.httpService.post(url, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(error => {
          return this.errorHandler(error);
        })
      );
  }
  postNewData(url: string, data: any): any {
    return this.httpService.postnew(url, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(error => {
          return this.errorHandler(error);
        })
      );
  }

  deleteData(url: string , data?: any): any {
    return this.httpService.delete(url , data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(error => {
          return this.errorHandler(error);
        })
      );
  }

  putData(url: string, data: any): any {
    return this.httpService.put(url, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(error => {
          return this.errorHandler(error);
        })
      );
  }

  uploadImage(url, data: any): any {
    return this.httpService.postUpload(url, data)
    .pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(error => {
        return this.errorHandler(error);
      })
    );
  }
  getClient(url: string): any {
    return this.httpService.getClient(url)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(error => {
          return this.errorHandler(error);
        })
      );
  }
  errorHandler(error: any) {
    this.errorService.errorHandler(error);
    return throwError(error.error);
  }
}
