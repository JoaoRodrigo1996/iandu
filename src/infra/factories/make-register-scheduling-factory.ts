import { RegisterScheduling } from '@/domain/scheduling/application/use-cases/register-scheduling'
import { PrismaService } from '../database/prisma'
import { PrismaSchedulingsRepository } from '../database/prisma/repositories/prisma-schedulings-repository'

export function makeRegisterSchedulingFactory() {
  const prisma = new PrismaService()
  const prismaSchedulingsRepository = new PrismaSchedulingsRepository(prisma)
  const useCase = new RegisterScheduling(prismaSchedulingsRepository)

  return useCase
}
