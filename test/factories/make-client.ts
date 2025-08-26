import type { PrismaService } from '@/infra/database/prisma'
import { PrismaClientMapper } from '@/infra/database/prisma/mappers/prisma-client-mapper'
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

export class ClientFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaClient(data: Partial<ClientProps> = {}): Promise<Client> {
    const client = makeClient(data)

    await this.prisma.client.create({
      data: PrismaClientMapper.toPrisma(client),
    })

    return client
  }
}
