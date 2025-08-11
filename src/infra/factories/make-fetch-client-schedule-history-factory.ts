import { FetchClientSchedulingsHistoryUseCase } from '@/domain/scheduling/application/use-cases/fetch-client-scheduling-history'
import { PrismaSchedulingsRepository } from '../database/prisma/repositories/prisma-schedulings-repository'

export function makeFetchClientScheduleHistoryFactory() {
  const schedulesRepository = new PrismaSchedulingsRepository()
  const useCase = new FetchClientSchedulingsHistoryUseCase(schedulesRepository)

  return useCase
}
