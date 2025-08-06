import type { Member } from '@/domain/scheduling/enterprise/entities/member'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class MemberPresenter {
  static toHTTP(member: Member) {
    return {
      id: member.id,
      clientId: member.clientId,
      organizationId: member.organizationId,
      role: member.role,
    }
  }
}
