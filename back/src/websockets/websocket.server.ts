import { Constructor, Context } from '@loopback/context';
import { HttpServer } from '@loopback/http-server';
import { Server, ServerOptions, Socket } from 'socket.io';
import { WebSocketControllerFactory } from './websocket-controller-factory';
import { getWebSocketMetadata, WebSocketMetadata } from "../decorators/webscoket.decorator";
import SocketIOServer = require("socket.io");
import {io} from 'socket.io-client';

const debug = require('debug')('loopback:websocket');

/* eslint-disable @typescript-eslint/no-explicit-any */
export type SockIOMiddleware = (
  socket: Socket,
  fn: (err?: any) => void,
) => void;

/**
 * A websocket server
 */
export class WebSocketServer extends Context {
  private io: Server;

  constructor(
    public ctx: Context,
    public readonly httpServer: HttpServer,
  ) {
    super(ctx);
    this.io = new Server(5000, {});
    ctx.bind('ws.server').to(this.io);
  }

  /**
   * Register a sock.io middleware function
   * @param fn
   */
  use(fn: SockIOMiddleware) {
    return this.io.use(fn);
  }

  /**
   * Register a websocket controller
   * @param ControllerClass
   * @param meta
   */
  route(ControllerClass: Constructor<any>, meta?: WebSocketMetadata | string | RegExp) {
    if(meta instanceof RegExp || typeof meta === 'string'){
      meta = { namespace: meta } as WebSocketMetadata;
    }
    if (meta == null) {
      meta = getWebSocketMetadata(ControllerClass) as WebSocketMetadata;
    }
    const nsp = (meta && meta.namespace) ? this.io.of(meta.namespace) : this.io;
    if (meta && meta.namespace) {
      this.ctx.bind(`ws.namespace.${meta.namespace}`).to(nsp);
    }

    /* eslint-disable @typescript-eslint/no-misused-promises */
    nsp.on('connection', async socket => {
      console.log('connection', 'connection');
      debug(
        'Websocket connected: id=%s namespace=%s',
        socket.id,
        socket.nsp.name,
      );
      // Create a request context
      const reqCtx = new Context(this);
      // Bind websocket
      reqCtx.bind('ws.socket').to(socket);
      // Instantiate the controller instance
      await new WebSocketControllerFactory(reqCtx, ControllerClass).create(
        socket,
      );
    });
    return nsp;
  }

  /**
   * Start the websocket server
   */
  async start() {
    await this.httpServer.start();
    // FIXME: Access HttpServer.server
    const server = (this.httpServer as any).server;
    this.io.attach(server);
  }

  /**
   * Stop the websocket server
   */
  async stop() {
    const close = new Promise<void>((resolve, reject) => {
      this.io.close(() => {
        resolve();
      });
    });
    await close;
    await this.httpServer.stop();
  }
}
