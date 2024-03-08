/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyInstance } from 'fastify';
import { server } from '@shared/infra/http/server';
import multer from 'multer';
import UsersController from '../controllers/UsersController';
import verifyJwt from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersController = new UsersController();

export default async function userRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: server.authenticate }, usersController.create);

  app.get('/:userId', usersController.show);

  app.patch('/avatar', { onRequest: [verifyJwt] }, usersController.updateProfilePhoto);

  app.get('/', usersController.find);

  app.post('/auth', usersController.auth);

  app.post('/auth/google', usersController.googleAuth);

}
