import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socket: any;
  public url = environment.baseUrl;
  constructor() {
      this.socket = io(this.url);
   }

   listen(eventName) {
     return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);
      });
     });
   }
}
