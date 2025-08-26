import { RegisterClient } from '@/domain/scheduling/application/use-cases/register-client'
import { BcryptHasher } from '../cryptography/bcrypt-hasher'
import { PrismaService } from '../database/prisma'
import { PrismaClientsRepository } from '../database/prisma/repositories/prisma-clients-repository'

export function makeCreateAccountFactory() {
  const prisma = new PrismaService()
  const hashGenerator = new BcryptHasher()

  const clientsRepository = new PrismaClientsRepository(prisma)
  const useCase = new RegisterClient(clientsRepository, hashGenerator)

  return useCase
}
