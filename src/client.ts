import { Entity } from './entity'
import type { UniqueEntityID } from './unique-entity-id'

interface ClientProps {
  name: string
  email: string
  password: string
}

export class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name
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
