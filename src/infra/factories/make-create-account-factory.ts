import { RegisterClient } from '@/domain/scheduling/application/use-cases/register-client'
import { BcryptHasher } from '../cryptography/bcrypt-hasher'
import { PrismaClientsRepository } from '../database/prisma/repositories/prisma-clients-repository'

export function makeCreateAccountFactory() {
  const clientsRepository = new PrismaClientsRepository()
  const hashGenerator = new BcryptHasher()

  const useCase = new RegisterClient(clientsRepository, hashGenerator)

  return useCase
}
