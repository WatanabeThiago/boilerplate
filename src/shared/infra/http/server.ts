import 'reflect-metadata';
import Fastify from 'fastify';
import '@shared/container';
import process from 'process';
import AppError from '@shared/errors/AppError';
import os from 'os';
import fastifyCors from '@fastify/cors';
import env from '@config/env';
import fastifyJwt from '@fastify/jwt';
import { ZodError } from 'zod';
import routes from './routes'

import '../typeorm';
import multipart from '@fastify/multipart';
import App from '@shared/config/configServer';

const server = Fastify({
  logger: true,
});
server.register(fastifyCors, {
  origin: '*',
});
server.register(multipart)
// server.register(require('@fastify/multipart'));

server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

routes()

(async () => {
  const app = new App()
  await app.bootstrap('Foursys')
})()

server.get('/health', (req, reply) => {
  const instanceName = os.hostname();
  const platform = os.platform();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  const cpus = os.cpus();
  const cpuData = cpus.map((cpu, index) => {
    return {
      id: index,
      model: cpu.model,
      speed: cpu.speed,
    };
  });


  reply.code(200).send({
    status: 'OK',
    instance: instanceName,
    platform,
    memory: {
      total: totalMemory,
      free: freeMemory,
    },
    cpu: cpuData,
  });
});

server.setErrorHandler((error, _, reply) => {
  console.error(error);
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
      errorName: error.errorName,
    });
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      issues: error.issues,
    });
  }
  return reply.status(500).send(error);
});

server.listen({
  host: '0.0.0.0',
  port: Number(process.env.PORT) || 3337,
});
console.log(
  `🔥 [SERVIDOR] Servidor iniciado em ${Number(process.env.PORT) || 3337}`,
);

export { server };
