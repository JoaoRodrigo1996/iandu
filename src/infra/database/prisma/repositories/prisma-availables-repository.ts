import type { AvailablesRepository } from '@/domain/scheduling/application/repositories/availables-repository'
import type { Available } from '@/domain/scheduling/enterprise/entities/available'
import type { PrismaService } from '..'
import { PrismaAvailableMapper } from '../mappers/prisma-available-mapper'

export class PrismaAvailablesRepository implements AvailablesRepository {
  constructor(private prisma: PrismaService) {}

  async create(available: Available): Promise<void> {
    const data = PrismaAvailableMapper.toPrisma(available)

    await this.prisma.organizationAvailableTimes.create({ data })
  }

  async findByOrganizationId(
    organizationId: string
  ): Promise<Available | null> {
    const organizationAvailable =
      await this.prisma.organizationAvailableTimes.findFirst({
        where: {
          organizationId: organizationId,
        },
      })

    if (!organizationAvailable) {
      return null
    }

    return PrismaAvailableMapper.toDomain(organizationAvailable)
  }

  async save(available: Available): Promise<void> {
    const data = PrismaAvailableMapper.toPrisma(available)

    await this.prisma.organizationAvailableTimes.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
