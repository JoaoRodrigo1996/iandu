import type { Available } from '@/domain/scheduling/enterprise/entities/available'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AvailablePresenter {
  static toHTTP(available: Available) {
    return {
      id: available.id,
      startTimeInMinutes: available.start_time_in_minutes,
      endTimeInMinutes: available.end_time_in_minutes,
      weekDay: available.week_day,
    }
  }
}
