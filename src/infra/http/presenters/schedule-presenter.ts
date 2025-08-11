import type { Scheduling } from '@/domain/scheduling/enterprise/entities/scheduling'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class SchedulePresenter {
  static toHTTP(schedule: Scheduling) {
    return {
      organizationId: schedule.organizationId,
      clientId: schedule.clientId,
      date: schedule.date,
    }
  }
}
