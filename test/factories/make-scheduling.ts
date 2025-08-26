import {
  Scheduling,
  type SchedulingProps,
} from '@/domain/scheduling/enterprise/entities/scheduling'
import type { PrismaService } from '@/infra/database/prisma'
import { PrismaScheduleMapper } from '@/infra/database/prisma/mappers/prisma-schedule-mapper'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'

export function makeScheduling(
  override: Partial<SchedulingProps> = {},
  id?: UniqueEntityID
) {
  const scheduling = Scheduling.create(
    {
      clientId: new UniqueEntityID(),
      organizationId: new UniqueEntityID(),
      date: new Date(Date.now() + 1000 * 60 * 180),
      ...override,
    },
    id
  )

  return scheduling
}

export class ScheduleFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaSchedule(
    data: Partial<SchedulingProps> = {}
  ): Promise<Scheduling> {
    const schedule = makeScheduling(data)

    await this.prisma.schedule.create({
      data: PrismaScheduleMapper.toPrisma(schedule),
    })

    return schedule
  }
}
