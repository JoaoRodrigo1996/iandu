import { GetClientProfile } from '@/domain/scheduling/application/use-cases/get-client-profile'
import { PrismaService } from '../database/prisma'
import { PrismaClientsRepository } from '../database/prisma/repositories/prisma-clients-repository'

export function makeGetClientProfileFactory() {
  const prisma = new PrismaService()
  const clientsRepository = new PrismaClientsRepository(prisma)
  const useCase = new GetClientProfile(clientsRepository)

  return useCase
}
