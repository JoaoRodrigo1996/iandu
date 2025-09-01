import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Available } from '@/domain/scheduling/enterprise/entities/available'
import type {
  Prisma,
  OrganizationAvailableTimes as PrismaAvailable,
} from '@prisma/client'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaAvailableMapper {
  static toDomain(raw: PrismaAvailable): Available {
    return Available.create(
      {
        week_day: raw.weekDay,
        start_time_in_minutes: raw.startTimeInMinutes,
        end_time_in_minutes: raw.endTimeInMinutes,
        organization_id: new UniqueEntityID(raw.organizationId),
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(
    available: Available
  ): Prisma.OrganizationAvailableTimesUncheckedCreateInput {
    return {
      id: available.id.toString(),
      weekDay: available.week_day,
      startTimeInMinutes: available.start_time_in_minutes,
      endTimeInMinutes: available.end_time_in_minutes,
      organizationId: available.organization_id.toString(),
    }
  }
}
