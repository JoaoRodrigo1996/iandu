import { AvailableUseCase } from '@/domain/scheduling/application/use-cases/available'
import { PrismaService } from '../database/prisma'
import { PrismaAvailablesRepository } from '../database/prisma/repositories/prisma-availables-repository'

export function makeAvailableFactory() {
  const prisma = new PrismaService()
  const availablesRepository = new PrismaAvailablesRepository(prisma)
  const useCase = new AvailableUseCase(availablesRepository)

  return useCase
}
