import type { Member } from '@/domain/scheduling/enterprise/entities/member'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class MemberPresenter {
  static toHTTP(member: Member) {
    return {
      id: member.id.toString(),
      clientId: member.clientId.toString(),
      organizationId: member.organizationId.toString(),
      role: member.role,
    }
  }
}
