/* eslint-disable @typescript-eslint/naming-convention */
// in types/fastify/index.d.ts

import fastify from 'fastify';
import { ServerResponse, IncomingMessage, Server } from 'http';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
  > {
    authenticate(): void;
  }
}
