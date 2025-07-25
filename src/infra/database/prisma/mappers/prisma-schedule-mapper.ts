import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Scheduling } from '@/domain/scheduling/enterprise/entities/scheduling'
import type { Prisma, Schedule as PrismaSchedule } from '@prisma/client'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaScheduleMapper {
  static toDomain(raw: PrismaSchedule): Scheduling {
    return Scheduling.create(
      {
        clientId: new UniqueEntityID(raw.clientId),
        organizationId: new UniqueEntityID(raw.organizationId),
        date: raw.date,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(schedule: Scheduling): Prisma.ScheduleUncheckedCreateInput {
    return {
      id: schedule.id.toString(),
      clientId: schedule.clientId.toString(),
      organizationId: schedule.organizationId.toString(),
      date: schedule.date,
    }
  }
}
