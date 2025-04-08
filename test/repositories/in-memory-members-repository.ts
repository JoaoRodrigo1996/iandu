import type { MembersRepository } from '@/domain/scheduling/application/repositories/members-respository'
import type { Member } from '@/domain/scheduling/enterprise/entities/member'

export class InMemoryMembersRepository implements MembersRepository {
  public items: Member[] = []

  async create(member: Member): Promise<void> {
    this.items.push(member)
  }

  async findById(id: string): Promise<Member | null> {
    const member = this.items.find(member => member.id.toString() === id)

    if (!member) {
      return null
    }

    return member
  }

  async findByClientIdAndOrganizationId(
    clientId: string,
    organizationId: string
  ): Promise<Member | null> {
    const member = this.items.find(
      member =>
        member.clientId.toString() === clientId &&
        member.organizationId.toString() === organizationId
    )

    if (!member) {
      return null
    }

    return member
  }
}
