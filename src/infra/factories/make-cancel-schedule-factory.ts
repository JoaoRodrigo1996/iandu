import { CancelSchedulingUseCase } from '@/domain/scheduling/application/use-cases/cancel-scheduling'
import { PrismaService } from '../database/prisma'
import { PrismaSchedulingsRepository } from '../database/prisma/repositories/prisma-schedulings-repository'

export function makeCancelScheduleFactory() {
  const prisma = new PrismaService()
  const schedulesRepository = new PrismaSchedulingsRepository(prisma)
  const useCase = new CancelSchedulingUseCase(schedulesRepository)

  return useCase
}
