import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type MemberProps = {
  role: string
  clientId: UniqueEntityID
  organizationId: UniqueEntityID
}

export class Member extends Entity<MemberProps> {
  get role() {
    return this.props.role
  }

  set role(role: string) {
    this.props.role = role
  }

  static create(props: MemberProps, id?: UniqueEntityID) {
    const member = new Member(props, id)

    return member
  }
}
