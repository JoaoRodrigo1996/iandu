import type { Optional } from '@/core/types/optional'
import { Entity } from '../../../../core/entities/entity'
import type { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import type { MemberProps } from './member'

export interface OrganizationProps {
  ownerId: UniqueEntityID
  members?: MemberProps
  name: string
  cnpj: string
  address: {
    street: string
    number: number
    complement: string
    neighborhood: string
    city: string
    state: string
    zip: string
  }
  email: string
  phone: string
  description: string
  sector: string
  createdAt: Date
  updatedAt?: Date
}

export class Organization extends Entity<OrganizationProps> {
  get ownerId() {
    return this.props.ownerId
  }

  get members() {
    return this.props.members
  }

  set members(members: OrganizationProps['members']) {
    this.props.members = members
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get cnpj() {
    return this.props.cnpj
  }

  set cnpj(cnpj: string) {
    this.props.cnpj = cnpj
    this.touch()
  }

  get address() {
    return this.props.address
  }

  set address(address: OrganizationProps['address']) {
    this.props.address = address
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get sector() {
    return this.props.sector
  }

  set sector(sector: string) {
    this.props.sector = sector
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<OrganizationProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const organization = new Organization(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return organization
  }
}
