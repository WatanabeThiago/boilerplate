/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FastifyReply, FastifyRequest } from 'fastify';

export default async function verifyJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
  } catch (err) {
    console.log({ err });
    return reply.status(401).send({ message: 'Unauthorized.' });
  }
}
