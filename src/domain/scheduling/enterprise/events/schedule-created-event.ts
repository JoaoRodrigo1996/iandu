import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { DomainEvent } from '@/core/events/domain-event'
import type { Scheduling } from '../entities/scheduling'

export class ScheduleCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public schedule: Scheduling

  constructor(schedule: Scheduling) {
    this.schedule = schedule
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.schedule.id
  }
}
