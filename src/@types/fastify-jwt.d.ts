import '@fastify/jwt'
import 'fastify-multer/typings/fastify'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
    };
  }

}