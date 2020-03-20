import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SessionStorage } from 'ngx-webstorage';
import { AuthToken } from '../../models/common.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  @SessionStorage('authenticationToken') public authenticationToken: AuthToken;
  public baseUrl: string = environment.baseUrl;

  constructor(
    public http: HttpClient
  ) { }

  delete(api: any, data?: any) {
    const options = {
      headers: this.getRequestHeaders(),
      body: JSON.stringify(data)
    };
    return this.http
    .delete(this.baseUrl + api, options)
    .pipe(
      map(respose => respose),
      catchError(this.handleError)
    );
  }


  /**
   * @method to perform the http `get` method
   * @param api - name of the service/api to be called
   * @returns the Observable<any>
   */
  get(api: any): Observable<any> {
    return this.http
      .get(this.baseUrl + api, { headers: this.getRequestHeaders() })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /**
   * @method to perform the http `post` method
   * @param api - name of the service/api to be called
   * @param data - data to be passed to server
   * @returns the Observable<any>
   */
  post(api: any, data?: any): Observable<any> {
    return this.http
      .post(this.baseUrl + api, JSON.stringify(data), { headers: this.getRequestHeaders() })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
  postuserData(api: any, data?: any): Observable<any> {
    return this.http
      .post(this.baseUrl + api, JSON.stringify(data), { headers: this.getuserRequestHeaders() })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
  postnew(api: any, data: any): Observable<any> {
    return this.http
      // tslint:disable-next-line: object-literal-shorthand
      .post(this.baseUrl + api, data, { headers: this.getnewRequestHeaders() })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
  getClient(api: any): Observable<any> {
    return this.http
      .get(api, { headers: this.getClientRequestHeaders() })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /**
   * @method to perform the http `post` method
   * @param api - name of the service/api to be called
   * @param data - data to be passed to server
   * @returns the Observable<any>
   */
  upload(api: any, data: any): Observable<any> {
    const formData = new FormData();
    formData.append('files', data);
    const headersData: HttpHeaders = new HttpHeaders();
    if (this.authenticationToken) {
      headersData.append('x-access-token', this.authenticationToken.tokenType + ' ' + this.authenticationToken.accessToken);
    }
    return this.http.post(this.baseUrl + api, formData, { headers: headersData }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * @method to perform the http `put` method
   * @param api - name of the service/api to be called
   * @param data - data to be passed for updating in server
   * @returns the Observable<any>
   */
  put(api: any, data: any): Observable<any> {
    return this.http
      .put(this.baseUrl + api, JSON.stringify(data), { headers: this.getRequestHeaders() })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /**
   * @method
   * @description
   * download the files
   */
  fileDownload(url: any) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * @method
   * @description
   * download the files based on the passed data
   */
  fileDataDownload(api: any, data: any) {
    return this.http.post(this.baseUrl + api, data, { headers: this.getFileUploadHeader(), responseType: 'blob' })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /**
   * @method
   * @description
   * Request headers to be set during file upload
   */
  private getFileUploadHeader(): HttpHeaders {
    let fileUploadHeader: HttpHeaders;
    return fileUploadHeader = new HttpHeaders({
      Authorization: this.authenticationToken.tokenType + ' ' + this.authenticationToken.accessToken
    });
  }

  postUpload(api: any, data: any): Observable<any> {
    return this.http.post(this.baseUrl + api, data, { headers: this.getnewRequestHeaders() }).pipe(
    map(response => response),
    catchError(this.handleError)
    );
    }


  /**
   * @method to get the request headers
   * @param api - name of the service/api to be called
   * @param data - data to be passed for deleting
   * @returns the request headers of type `Headers`
   */
  getRequestHeaders() {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.authenticationToken) {
      headers = headers.append('x-access-token', this.authenticationToken.tokenType + ' ' + this.authenticationToken.accessToken);
      headers = headers.append('Cache-Control', 'no-cache');
      headers = headers.append('Pragma', 'no-cache');
      headers = headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
    }
    return headers;
  }
  getuserRequestHeaders() {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.authenticationToken) {
      headers = headers.append('superadmin', 'true');
      headers = headers.append('x-access-token', this.authenticationToken.tokenType + ' ' + this.authenticationToken.accessToken);
      headers = headers.append('Cache-Control', 'no-cache');
      headers = headers.append('Pragma', 'no-cache');
      headers = headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
    }
    return headers;
  }
  getnewRequestHeaders() {
    let headers: HttpHeaders = new HttpHeaders({
    });
    // include the autherisation header if it exitsts
    if (this.authenticationToken) {
      headers = headers.append('x-access-token', this.authenticationToken.tokenType + ' ' + this.authenticationToken.accessToken);
      headers = headers.append('Cache-Control', 'no-cache');
      headers = headers.append('Pragma', 'no-cache');
      headers = headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
    }
    return headers;
  }

  getClientRequestHeaders() {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.authenticationToken) {
      headers = headers.append('x-access-token', this.authenticationToken.accessToken);
      headers = headers.append('Cache-Control', 'no-cache');
      headers = headers.append('Pragma', 'no-cache');
      headers = headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
    }
    return headers;
  }
  handleError(error: any): Observable <any> {
    return throwError(error);
  }
}
