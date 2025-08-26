import type { MembersRepository } from '@/domain/scheduling/application/repositories/members-respository'
import type { Member } from '@/domain/scheduling/enterprise/entities/member'
import type { PrismaService } from '..'
import { PrismaMemberMapper } from '../mappers/prisma-member-mapper'

export class PrismaMembersRepository implements MembersRepository {
  constructor(private prisma: PrismaService) {}

  async create(member: Member): Promise<void> {
    const data = PrismaMemberMapper.toPrisma(member)

    await this.prisma.member.create({ data })
  }

  async findById(id: string): Promise<Member | null> {
    const member = await this.prisma.member.findUnique({
      where: {
        id,
      },
    })

    if (!member) {
      return null
    }

    return PrismaMemberMapper.toDomain(member)
  }

  async findByClientIdAndOrganizationId(
    clientId: string,
    organizationId: string
  ): Promise<Member | null> {
    const member = await this.prisma.member.findFirst({
      where: {
        clientId,
        organizationId,
      },
    })

    if (!member) {
      return null
    }

    return PrismaMemberMapper.toDomain(member)
  }
}
