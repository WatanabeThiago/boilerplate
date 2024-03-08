/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/prefer-default-export */
import 'reflect-metadata';
import Fastify from 'fastify';
import '@shared/container';
import process from 'process';
import AppError from '@shared/errors/AppError';
import os from 'os';
import fastifyCors from '@fastify/cors';
import env from '@config/env';
import fastifyJwt from '@fastify/jwt';
import fontsRoutes from '@modules/v1/fonts/infra/http/routes/fonts.routes';
import productsRoutes from '@modules/v1/products/infra/http/routes/products.routes';
import { ZodError } from 'zod';
import routes from './routes'

import { pipeline } from 'stream';
import util from 'util';
import fs from 'fs';

import '../typeorm';
import multipart from '@fastify/multipart';

const pump = util.promisify(pipeline);
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

server.post('/upload', async function (req, reply) {

  const parts = (req as any).parts()

  for await (const part of parts) {
    if (part.file) {
      console.log(part)
      // upload and save the file
      await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`))

    } else {
      // do something with the non-files parts
    }

  }

  return { message: 'files uploaded' }
})

server.register(fontsRoutes, {
  prefix: 'v1/fonts',
});
server.register(productsRoutes, {
  prefix: 'v1/products',
});

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

  const healthcheckData = {
    status: 'OK',
    instance: instanceName,
    platform,
    memory: {
      total: Math.round(totalMemory / 1024 / 1024),
      free: Math.round(freeMemory / 1024 / 1024),
    },
  };

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
