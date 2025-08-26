import { FetchOrganizationByName } from '@/domain/scheduling/application/use-cases/fetch-organization-by-name'
import { PrismaService } from '../database/prisma'
import { PrismaOrganizationsRepository } from '../database/prisma/repositories/prisma-organizations-repository'

export function makeFetchOrganizationByNameFactory() {
  const prisma = new PrismaService()
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository(
    prisma
  )
  const useCase = new FetchOrganizationByName(prismaOrganizationsRepository)

  return useCase
}
