import { AuthenticateClient } from '@/domain/scheduling/application/use-cases/authenticate-client'
import type { FastifyInstance } from 'fastify'
import { BcryptHasher } from '../cryptography/bcrypt-hasher'
import { JwtEncrypter } from '../cryptography/jwt-encrypter'
import { PrismaClientsRepository } from '../database/prisma/repositories/prisma-clients-repository'

export function makeAuthenticateFactory(app: FastifyInstance) {
  const clientsRepository = new PrismaClientsRepository()
  const hashGenerator = new BcryptHasher()
  const encryper = new JwtEncrypter(app)

  const useCase = new AuthenticateClient(
    clientsRepository,
    hashGenerator,
    encryper
  )

  return useCase
}
