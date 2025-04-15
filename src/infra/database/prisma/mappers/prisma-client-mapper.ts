import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Client } from '@/domain/scheduling/enterprise/entities/client'

import type { Prisma, Client as PrismaClient } from '@prisma/client'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaClientMapper {
  static toDomain(raw: PrismaClient): Client {
    return Client.create(
      {
        name: raw.name,
        userName: raw.userName,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(client: Client): Prisma.ClientUncheckedCreateInput {
    return {
      id: client.id.toString(),
      name: client.name,
      userName: client.userName,
      email: client.email,
      password: client.password,
    }
  }
}
