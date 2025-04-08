import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  Member,
  type MemberProps,
} from '../../src/domain/scheduling/enterprise/entities/member'

export function makeMember(
  override: Partial<MemberProps> = {},
  id?: UniqueEntityID
) {
  const member = Member.create(
    {
      clientId: new UniqueEntityID(faker.string.uuid()),
      organizationId: new UniqueEntityID(faker.string.uuid()),
      role: 'admin',
      ...override,
    },
    id
  )

  return member
}
