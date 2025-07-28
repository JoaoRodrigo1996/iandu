import { RegisterOrganization } from '@/domain/scheduling/application/use-cases/register-organization'
import { PrismaOrganizationsRepository } from '../database/prisma/repositories/prisma-organizations-repository'

export function makeOrganizationFactory() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new RegisterOrganization(prismaOrganizationsRepository)

  return useCase
}
