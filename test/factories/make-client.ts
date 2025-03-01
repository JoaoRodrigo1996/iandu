import { faker } from '@faker-js/faker'
import type { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  Client,
  type ClientProps,
} from '../../src/domain/scheduling/enterprise/entities/client'

export function makeClient(
  override: Partial<ClientProps> = {},
  id?: UniqueEntityID
) {
  const client = Client.create(
    {
      name: faker.person.fullName(),
      userName: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  )

  return client
}
