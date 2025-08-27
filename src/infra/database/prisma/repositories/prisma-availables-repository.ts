import type { AvailablesRepository } from '@/domain/scheduling/application/repositories/availables-repository'
import type { Available } from '@/domain/scheduling/enterprise/entities/available'
import type { PrismaService } from '..'
import { PrismaAvailableMapper } from '../mappers/prisma-available-mapper'

export class PrismaAvailablesRepository implements AvailablesRepository {
  constructor(private prisma: PrismaService) {}

  async create(available: Available): Promise<void> {
    const data = PrismaAvailableMapper.toPrisma(available)

    await this.prisma.available.create({ data })
  }
}
