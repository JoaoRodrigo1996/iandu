import type { PrismaService } from '@/infra/database/prisma'
import { PrismaMemberMapper } from '@/infra/database/prisma/mappers/prisma-member-mapper'
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

export class MemberFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaMember(data: Partial<MemberProps> = {}): Promise<Member> {
    const member = makeMember(data)

    await this.prisma.member.create({
      data: PrismaMemberMapper.toPrisma(member),
    })

    return member
  }
}
