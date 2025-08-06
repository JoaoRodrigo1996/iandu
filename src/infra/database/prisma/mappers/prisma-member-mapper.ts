import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Member } from '@/domain/scheduling/enterprise/entities/member'
import type { $Enums, Prisma, Member as PrismaMember } from '@prisma/client'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaMemberMapper {
  static toDomain(raw: PrismaMember) {
    return Member.create(
      {
        clientId: new UniqueEntityID(raw.clientId),
        organizationId: new UniqueEntityID(raw.organizationId),
        role: raw.role,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(member: Member): Prisma.MemberUncheckedCreateInput {
    return {
      id: member.id.toString(),
      clientId: member.clientId.toString(),
      organizationId: member.organizationId.toString(),
      role: member.role as $Enums.Role,
    }
  }
}
