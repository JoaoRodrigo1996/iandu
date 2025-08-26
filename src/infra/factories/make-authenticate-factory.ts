import { AuthenticateClient } from '@/domain/scheduling/application/use-cases/authenticate-client'
import type { FastifyInstance } from 'fastify'
import { BcryptHasher } from '../cryptography/bcrypt-hasher'
import { JwtEncrypter } from '../cryptography/jwt-encrypter'
import { PrismaService } from '../database/prisma'
import { PrismaClientsRepository } from '../database/prisma/repositories/prisma-clients-repository'

export function makeAuthenticateFactory(app: FastifyInstance) {
  const prisma = new PrismaService()
  const hashGenerator = new BcryptHasher()
  const encryper = new JwtEncrypter(app)

  const clientsRepository = new PrismaClientsRepository(prisma)
  const useCase = new AuthenticateClient(
    clientsRepository,
    hashGenerator,
    encryper
  )

  return useCase
}
