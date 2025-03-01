import { Entity } from '../../../../core/entities/entity'
import type { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface ClientProps {
  name: string
  userName: string
  email: string
  password: string
}

export class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name
  }

  get userName() {
    return this.props.userName
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  static create(props: ClientProps, id?: UniqueEntityID) {
    const client = new Client(props, id)

    return client
  }
}
