import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(/*private socket: Socket, */private http: HttpClient) { }

  /*public onNewMessage = () => {
    return Observable.create( (observer: any) => {
      console.log(this.socket);
      this.socket.on('weather', (weatherData: any) => {
        observer.next(weatherData);
      });
    });
  }*/

  public getWeather(){
    return this.http.get(`${environment.api_url}/weather`);
  }
}
