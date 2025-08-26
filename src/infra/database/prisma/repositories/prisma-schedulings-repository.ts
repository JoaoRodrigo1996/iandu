import type { SchedulingsRepository } from '@/domain/scheduling/application/repositories/schedulingsRepository'
import type { Scheduling } from '@/domain/scheduling/enterprise/entities/scheduling'
import type { PrismaService } from '../index'
import { PrismaScheduleMapper } from '../mappers/prisma-schedule-mapper'

export class PrismaSchedulingsRepository implements SchedulingsRepository {
  constructor(private prisma: PrismaService) {}

  async create(agenda: Scheduling): Promise<void> {
    const data = PrismaScheduleMapper.toPrisma(agenda)

    await this.prisma.schedule.create({ data })
  }

  async findById(id: string): Promise<Scheduling | null> {
    const schedule = await this.prisma.schedule.findUnique({
      where: {
        id,
      },
    })

    if (!schedule) {
      return null
    }

    return PrismaScheduleMapper.toDomain(schedule)
  }

  async findByClientId(clientId: string): Promise<Scheduling[]> {
    const schedules = await this.prisma.schedule.findMany({
      where: {
        clientId,
      },
    })

    return schedules.map(PrismaScheduleMapper.toDomain)
  }

  async findByClientIdOrganizationIdAndDate(
    clientId: string,
    organizationId: string,
    date: Date
  ): Promise<Scheduling | null> {
    const schedule = await this.prisma.schedule.findFirst({
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

  async cancel(scheduling: Scheduling): Promise<void> {
    await this.prisma.schedule.delete({
      where: {
        id: scheduling.id.toString(),
      },
    })
  }
}
