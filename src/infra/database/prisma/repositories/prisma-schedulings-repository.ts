import type { SchedulingsRepository } from '@/domain/scheduling/application/repositories/schedulingsRepository'
import type { Scheduling } from '@/domain/scheduling/enterprise/entities/scheduling'
import { prisma } from '../index'
import { PrismaScheduleMapper } from '../mappers/prisma-schedule-mapper'

export class PrismaSchedulingsRepository implements SchedulingsRepository {
  async create(agenda: Scheduling): Promise<void> {
    const data = PrismaScheduleMapper.toPrisma(agenda)

    await prisma.schedule.create({ data })
  }

  findById(id: string): Promise<Scheduling | null> {
    throw new Error('Method not implemented.')
  }

  findByClientId(clientId: string): Promise<Scheduling[]> {
    throw new Error('Method not implemented.')
  }

  async findByClientIdOrganizationIdAndDate(
    clientId: string,
    organizationId: string,
    date: Date
  ): Promise<Scheduling | null> {
    const schedule = await prisma.schedule.findFirst({
      where: {
        clientId,
        organizationId,
        date,
      },
    })

    if (!schedule) {
      return null
    }

    return PrismaScheduleMapper.toDomain(schedule)
  }

  cancel(scheduling: Scheduling): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
