import { GetClientByUserName } from '@/domain/scheduling/application/use-cases/get-client-by-user-name'
import { PrismaService } from '../database/prisma'
import { PrismaClientsRepository } from '../database/prisma/repositories/prisma-clients-repository'

export function makeGetClientByUsernameFactory() {
  const prisma = new PrismaService()
  const clientsRepository = new PrismaClientsRepository(prisma)
  const useCase = new GetClientByUserName(clientsRepository)

  return useCase
}
