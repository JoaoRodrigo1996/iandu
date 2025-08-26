import { RegisterMemberUseCase } from '@/domain/scheduling/application/use-cases/register-member'
import { PrismaService } from '../database/prisma'
import { PrismaMembersRepository } from '../database/prisma/repositories/prisma-members-repository'
import { PrismaOrganizationsRepository } from '../database/prisma/repositories/prisma-organizations-repository'

export function makeRegisterMemberfactory() {
  const prisma = new PrismaService()
  const membersRepository = new PrismaMembersRepository(prisma)
  const organizationsRepository = new PrismaOrganizationsRepository(prisma)
  const useCase = new RegisterMemberUseCase(
    membersRepository,
    organizationsRepository
  )

  return useCase
}
