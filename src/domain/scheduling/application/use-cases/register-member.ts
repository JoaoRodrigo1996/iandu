import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { type Either, left, right } from '../../../../core/either'
import { Member } from '../../enterprise/entities/member'
import type { MembersRepository } from '../repositories/members-respository'
import type { OrganizationsRepository } from '../repositories/organizations-repository'
import { MemberAlreadyRegisteredError } from './errors/member-already-registered'

interface RegisterMemberUseCaseRequest {
  clientId: string
  organizationId: string
  role: string
}

type RegisterMemberUseCaseResponse = Either<
  MemberAlreadyRegisteredError,
  {
    member: Member
  }
>

export class RegisterMemberUseCase {
  constructor(
    private membersRepository: MembersRepository,
    private organizationsRespository: OrganizationsRepository
  ) {}

  async execute({
    clientId,
    organizationId,
    role,
  }: RegisterMemberUseCaseRequest): Promise<RegisterMemberUseCaseResponse> {
    const member = Member.create({
      clientId: new UniqueEntityID(clientId),
      organizationId: new UniqueEntityID(organizationId),
      role,
    })

    const organization =
      await this.organizationsRespository.findById(organizationId)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    const memberAlreadyRegistered =
      await this.membersRepository.findByClientIdAndOrganizationId(
        clientId,
        organizationId
      )

    if (memberAlreadyRegistered) {
      return left(new MemberAlreadyRegisteredError(member.id.toString()))
    }

    await this.membersRepository.create(member)

    return right({ member })
  }
}
