import { RegisterScheduling } from "@/domain/scheduling/application/use-cases/register-scheduling"
import { PrismaSchedulingsRepository } from "../database/prisma/repositories/prisma-schedulings-repository"

export function makeRegisterSchedulingFactory(){
  const prismaSchedulingsRepository = new PrismaSchedulingsRepository()
  const useCase = new RegisterScheduling(prismaSchedulingsRepository)

  return useCase
}
