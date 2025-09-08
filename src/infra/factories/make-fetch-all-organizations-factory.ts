import { FetchAllOrganizations } from '@/domain/scheduling/application/use-cases/fetch-all-organizations'
import { PrismaService } from '../database/prisma'
import { PrismaOrganizationsRepository } from '../database/prisma/repositories/prisma-organizations-repository'

export function makeFetchAllOrganizationFactory() {
  const prisma = new PrismaService()
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository(
    prisma
  )
  const useCase = new FetchAllOrganizations(prismaOrganizationsRepository)

  return useCase
}
