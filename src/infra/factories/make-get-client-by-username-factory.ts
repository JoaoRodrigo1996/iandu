import { GetClientByUserName } from '@/domain/scheduling/application/use-cases/get-client-by-user-name'
import { PrismaClientsRepository } from '../database/prisma/repositories/prisma-clients-repository'

export function makeGetClientByUsernameFactory() {
  const clientsRepository = new PrismaClientsRepository()
  const useCase = new GetClientByUserName(clientsRepository)

  return useCase
}
