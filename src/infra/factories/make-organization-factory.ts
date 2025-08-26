import { RegisterOrganization } from '@/domain/scheduling/application/use-cases/register-organization'
import { PrismaService } from '../database/prisma'
import { PrismaOrganizationsRepository } from '../database/prisma/repositories/prisma-organizations-repository'

export function makeOrganizationFactory() {
  const prisma = new PrismaService()
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository(
    prisma
  )
  const useCase = new RegisterOrganization(prismaOrganizationsRepository)

  return useCase
}
