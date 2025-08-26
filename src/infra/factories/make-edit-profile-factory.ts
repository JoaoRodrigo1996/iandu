import { EditProfileUseCase } from '@/domain/scheduling/application/use-cases/edit-profile'
import { PrismaService } from '../database/prisma'
import { PrismaClientsRepository } from '../database/prisma/repositories/prisma-clients-repository'

export function makeEditProfileFactory() {
  const prisma = new PrismaService()
  const clientsRepository = new PrismaClientsRepository(prisma)
  const useCase = new EditProfileUseCase(clientsRepository)

  return useCase
}
