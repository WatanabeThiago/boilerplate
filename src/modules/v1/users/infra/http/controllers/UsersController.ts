/* eslint-disable import/no-extraneous-dependencies */
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import AuthenticateUserService, {
  AuthenticateUserReq,
} from '@modules/v1/users/services/AuthenticateUserService';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { pipeline } from 'stream';
import GoogleAuthenticateUserService, {
  GoogleAuthenticateUserReq,
} from '@modules/v1/users/services/GoogleAuthenticateUserService';
import ShowUserService, {
  ShowUserServiceReq,
} from '../../../useCases/ShowUserService';
import FindUserService, {
  FindUserServiceReq,
} from '../../../useCases/FindUserService';
import CreateUserService, {
  CreateUserServiceReq,
} from '../../../useCases/CreateUserService';
import UpdateProfilePhotoService from '@modules/v1/users/services/UpdateProfilePhotoService';
import { IFile } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import util from 'util';
import fs from 'fs'
const pump = util.promisify(pipeline);

export default class UsersController {
  public async create(
    req: FastifyRequest<{ Body: CreateUserServiceReq }>,
    res: FastifyReply,
  ): Promise<FastifyReply> {
    const schema = z.object({
      personData: z.object({
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string(),
      }),
      email: z.string().email(),
      password: z.string().min(8).max(20),
    });
    const body = schema.parse(req.body);

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(body);

    return res.send(instanceToInstance(user));
  }

  public async auth(
    req: FastifyRequest<{ Body: AuthenticateUserReq }>,
    res: FastifyReply,
  ): Promise<FastifyReply> {
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const data = await authenticateUserService.execute(req.body);

    return res.send(instanceToInstance(data));
  }

  // TODO: Separar isso
  public async googleAuth(
    req: FastifyRequest<{ Body: GoogleAuthenticateUserReq }>,
    res: FastifyReply,
  ): Promise<FastifyReply> {
    const authenticateUserService = container.resolve(
      GoogleAuthenticateUserService,
    );
    const data = await authenticateUserService.execute({
      accessToken: req.body.accessToken,
      redirectUri: req.body.redirectUri,
    });

    return res.send(instanceToInstance(data));
  }

  public async show(
    req: FastifyRequest<{ Params: ShowUserServiceReq }>,
    res: FastifyReply,
  ): Promise<void> {
    const showUserService = container.resolve(ShowUserService);
    const user = await showUserService.execute({
      userId: req.params.userId,
    });

    return res.send(instanceToInstance(user));
  }

  public async find(
    req: FastifyRequest<{ Querystring: FindUserServiceReq }>,
    res: FastifyReply,
  ): Promise<void> {
    const findUserService = container.resolve(FindUserService);

    const { email, phone } = req.query;
    const user = await findUserService.execute({
      email: email as string,
      phone: phone as string,
    });

    res.send(instanceToInstance(user));
  }

  public async updateProfilePhoto(
    req: FastifyRequest,
    res: FastifyReply,
  ): Promise<void> {
    const updateProfilePhotoService = container.resolve(UpdateProfilePhotoService);

    const parts: IFile[] = (req as any).parts()
    const files: any = {}
    for await (const part of parts) {
      if (part.file) {
        files[`${part.fieldname}`] = {
          filename: part.filename,
          fieldname: part.fieldname,
          mimetype: part.mimetype,
        }
        // upload and save the file
        await pump(part.file, fs.createWriteStream(`./tmp/${part.filename}`))
        const user = await updateProfilePhotoService.execute({
          userId: req.user.sub,

          file: {
            acl: 'public-read',
            filename: part.filename
          }
        });

        return res.send({ user: instanceToInstance(user) });
      }
    }
  }
}
