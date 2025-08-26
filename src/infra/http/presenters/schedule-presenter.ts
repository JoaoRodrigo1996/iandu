import type { Scheduling } from '@/domain/scheduling/enterprise/entities/scheduling'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class SchedulePresenter {
  static toHTTP(schedule: Scheduling) {
    return {
      id: schedule.id.toString(),
      organizationId: schedule.organizationId.toString(),
      clientId: schedule.clientId.toString(),
      date: schedule.date,
    }
  }
}
