import { EditProfileUseCase } from '@/domain/scheduling/application/use-cases/edit-profile'
import { PrismaClientsRepository } from '../database/prisma/repositories/prisma-clients-repository'

export function makeEditProfileFactory() {
  const clientsRepository = new PrismaClientsRepository()
  const useCase = new EditProfileUseCase(clientsRepository)

  return useCase
}
