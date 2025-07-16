import type { ClientsRepository } from '@/domain/scheduling/application/repositories/clients-repository'
import type { Client } from '@/domain/scheduling/enterprise/entities/client'
import { prisma } from '../index'
import { PrismaClientMapper } from '../mappers/prisma-client-mapper'

export class PrismaClientsRepository implements ClientsRepository {
  async create(client: Client): Promise<void> {
    const data = PrismaClientMapper.toPrisma(client)

    await prisma.client.create({ data })
  }

  async findById(clientId: string): Promise<Client | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: { email },
    })

    if (!client) {
      return null
    }

    return PrismaClientMapper.toDomain(client)
  }

  async findByUserName(userName: string): Promise<Client | null> {
    throw new Error('Method not implemented.')
  }

  async update(client: Client): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
