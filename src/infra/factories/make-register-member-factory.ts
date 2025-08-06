import { RegisterMemberUseCase } from '@/domain/scheduling/application/use-cases/register-member'
import { PrismaMembersRepository } from '../database/prisma/repositories/prisma-members-repository'
import { PrismaOrganizationsRepository } from '../database/prisma/repositories/prisma-organizations-repository'

export function makeRegisterMemberfactory() {
  const membersRepository = new PrismaMembersRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new RegisterMemberUseCase(
    membersRepository,
    organizationsRepository
  )

  return useCase
}
