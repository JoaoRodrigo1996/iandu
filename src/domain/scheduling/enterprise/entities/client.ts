import { Entity } from '../../../../core/entities/entity'
import type { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface ClientProps {
  name: string
  userName: string
  email: string
  password: string
  updatedAt?: Date
}

export class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get userName() {
    return this.props.userName
  }

  set userName(userName: string) {
    this.props.userName = userName
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get password() {
    return this.props.password
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: ClientProps, id?: UniqueEntityID) {
    const client = new Client(props, id)

    return client
  }
}
