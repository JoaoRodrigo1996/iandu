import type { Member } from '../../enterprise/entities/member'

export abstract class MembersRepository {
  abstract create(member: Member): Promise<void>
  abstract findById(id: string): Promise<Member | null>
  abstract findByClientIdAndOrganizationId(
    clientId: string,
    organizationId: string
  ): Promise<Member | null>
}
