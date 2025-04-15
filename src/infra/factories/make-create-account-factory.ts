import { RegisterClient } from '@/domain/scheduling/application/use-cases/register-client'
import { BcryptHasher } from '../cryptography/bcrypt-hasher'
import { PrismaCreateAccountRepository } from '../database/prisma/repositories/prisma-create-account-repository'

export function makeCreateAccountFactory() {
  const clientsRepository = new PrismaCreateAccountRepository()
  const hashGenerator = new BcryptHasher()

  const useCase = new RegisterClient(clientsRepository, hashGenerator)

  return useCase
}
