import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { makeMember } from 'test/factories/make-member'
import { makeOrganization } from 'test/factories/make-organization'
import { InMemoryMembersRepository } from 'test/repositories/in-memory-members-repository'
import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { MemberAlreadyRegisteredError } from './errors/member-already-registered'
import { RegisterMemberUseCase } from './register-member'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let inMemoryMembersRepository: InMemoryMembersRepository
let sut: RegisterMemberUseCase

describe('Register member', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    inMemoryMembersRepository = new InMemoryMembersRepository()
    sut = new RegisterMemberUseCase(
      inMemoryMembersRepository,
      inMemoryOrganizationsRepository
    )
  })

  it('should be able to register a new member to a organization', async () => {
    const newOrganization = makeOrganization()

    inMemoryOrganizationsRepository.create(newOrganization)

    const result = await sut.execute({
      organizationId: newOrganization.id.toString(),
      clientId: 'client-01',
      role: 'admin',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      member: inMemoryMembersRepository.items[0],
    })
  })

  it('should not be able to register a new member to a non-existing organization', async () => {
    const result = await sut.execute({
      organizationId: 'non-existing-organization',
      clientId: 'client-01',
      role: 'admin',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to register a new member if already registered', async () => {
    const newOrganization = makeOrganization()
    const newMember = makeMember(
      {
        clientId: new UniqueEntityID('client-01'),
        organizationId: newOrganization.id,
      },
      new UniqueEntityID('member-01')
    )

    inMemoryOrganizationsRepository.create(newOrganization)
    inMemoryMembersRepository.create(newMember)

    const result = await sut.execute({
      organizationId: newOrganization.id.toString(),
      clientId: 'client-01',
      role: 'admin',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(MemberAlreadyRegisteredError)
  })
})
