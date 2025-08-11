import { FetchOrganizationByName } from '@/domain/scheduling/application/use-cases/fetch-organization-by-name'
import { PrismaOrganizationsRepository } from '../database/prisma/repositories/prisma-organizations-repository'

export function makeFetchOrganizationByNameFactory() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new FetchOrganizationByName(prismaOrganizationsRepository)

  return useCase
}
