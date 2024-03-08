/* eslint-disable @typescript-eslint/naming-convention */
import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: number }; // payload type is used for signing and verifying
    user: {
      sub: string;
      data: {
        id: string;
        name: string;
      };
    }; // user type is return type of `request.user` object
  }
}
