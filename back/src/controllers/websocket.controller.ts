import {Socket} from 'socket.io';
import { ws } from '../decorators/webscoket.decorator';


// import {inject} from '@loopback/core';


export class WebsocketController {
  constructor(@ws.socket() // Equivalent to `@inject('ws.socket')`
  private socket: Socket) {}

  
  @ws.connect()
  async connect(socket: Socket){
    console.log('Client connected: %s', this.socket.id);
    await this.socket.join('room 1');
    await this.socket.emit('weather', 'this.getWeathers()');

    setInterval( async () => {
      await this.socket.emit('weather', 'this.getWeathers()');
    }, 10000);
  };

  @ws.subscribe(/.+/)
  logMessage(...args: unknown[]) {
    console.log('Message: %s', args);
  }

  @ws.disconnect()
  async disconect(){
    console.log('Client disconnected: %s', this.socket.id);
  };

}
