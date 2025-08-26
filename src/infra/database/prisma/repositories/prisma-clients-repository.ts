import type { ClientsRepository } from '@/domain/scheduling/application/repositories/clients-repository'
import type { Client } from '@/domain/scheduling/enterprise/entities/client'
import type { PrismaService } from '../index'
import { PrismaClientMapper } from '../mappers/prisma-client-mapper'

export class PrismaClientsRepository implements ClientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(client: Client): Promise<void> {
    const data = PrismaClientMapper.toPrisma(client)

    await this.prisma.client.create({ data })
  }

  async findById(clientId: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    })

    if (!client) {
      return null
    }

    return PrismaClientMapper.toDomain(client)
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { email },
    })

    if (!client) {
      return null
    }

    return PrismaClientMapper.toDomain(client)
  }

  async findByUserName(userName: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { userName },
    })

    if (!client) {
      return null
    }

    return PrismaClientMapper.toDomain(client)
  }

  async update(client: Client): Promise<void> {
    const data = PrismaClientMapper.toPrisma(client)

    await Promise.all([
      this.prisma.client.update({
        where: {
          id: client.id.toString(),
        },
        data,
      }),
    ])
  }
}
