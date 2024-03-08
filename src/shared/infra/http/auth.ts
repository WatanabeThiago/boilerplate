/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  FastifyPluginCallback,
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
} from 'fastify';
import { verify } from 'jsonwebtoken';

interface DecodedToken {
  username: string;
  id: string;
}

const authPlugin: FastifyPluginCallback = (
  fastify: FastifyInstance,
  options,
  done,
) => {
  const secretKey = process.env.SECRET!; // Chave secreta para assinar e verificar tokens JWT

  // Middleware para verificar o token JWT em rotas protegidas
  fastify.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { authorization } = request.headers as { authorization?: string };
        if (!authorization || !authorization.startsWith('Bearer ')) {
          throw new Error('Token não fornecido');
        }

        // Extrair o token do cabeçalho
        const token = authorization.slice(7);

        // Verificar o token
        const payload = verify(token, secretKey) as DecodedToken;

        // Adicionar o payload decodificado à requisição
        request.user = payload;

        // Continuar com o fluxo da requisição
        return;
      } catch (err) {
        reply.code(401).send({ error: 'Token inválido' });
      }
    },
  );

  done();
};

export default authPlugin;
