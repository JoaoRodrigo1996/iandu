import { EditAvailableUseCase } from '@/domain/scheduling/application/use-cases/edit-available'
import { PrismaService } from '../database/prisma'
import { PrismaAvailablesRepository } from '../database/prisma/repositories/prisma-availables-repository'

export function makeEditAvailableFactory() {
  const prisma = new PrismaService()
  const availablesRepository = new PrismaAvailablesRepository(prisma)
  const useCase = new EditAvailableUseCase(availablesRepository)

  return useCase
}
