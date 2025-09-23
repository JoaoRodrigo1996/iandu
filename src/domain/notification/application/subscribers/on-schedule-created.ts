import { DomainEvents } from '@/core/events/domain-events'
import type { EventHandler } from '@/core/events/event-handler'
import type { SchedulingsRepository } from '@/domain/scheduling/application/repositories/schedulingsRepository'
import { ScheduleCreatedEvent } from '@/domain/scheduling/enterprise/events/schedule-created-event'
import type { SendNotification } from '../use-cases/send-notification'

export class OnScheduleCreated implements EventHandler {
  constructor(
    private schedulesRepository: SchedulingsRepository,
    private sendNotification: SendNotification
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewScheduleNotification.bind(this),
      ScheduleCreatedEvent.name
    )
  }

  private async sendNewScheduleNotification({
    schedule,
  }: ScheduleCreatedEvent) {
    const scheduleAlreadyExists = await this.schedulesRepository.findById(
      schedule.id.toString()
    )

    console.log(`ON SCHEDULE CREATED - ${scheduleAlreadyExists}`)

    if (scheduleAlreadyExists) {
      await this.sendNotification.execute({
        recipientId: schedule.clientId.toString(),
        content: `Nova resposta em "${scheduleAlreadyExists.organizationId}"`,
        title: scheduleAlreadyExists.date.toString(),
      })
    }
  }
}
