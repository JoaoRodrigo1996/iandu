import type { Scheduling } from '../../enterprise/entities/scheduling'

export abstract class SchedulingsRepository {
  abstract create(agenda: Scheduling): Promise<void>
  abstract findById(id: string): Promise<Scheduling | null>
  abstract findByClientId(clientId: string): Promise<Scheduling[]>
  abstract findByClientIdAndDate(
    clientId: string,
    date: Date
  ): Promise<Scheduling | null>
  abstract cancel(scheduling: Scheduling): Promise<void>
}
