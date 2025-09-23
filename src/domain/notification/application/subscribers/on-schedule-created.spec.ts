import { makeClient } from 'test/factories/make-client'
import { makeOrganization } from 'test/factories/make-organization'
import { makeScheduling } from 'test/factories/make-scheduling'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { InMemorySchedulingsRepository } from 'test/repositories/in-memory-schedulings-repository'
import { waitFor } from 'test/utils/wait-for'
import { vi } from 'vitest'
import { SendNotification } from '../use-cases/send-notification'
import { OnScheduleCreated } from './on-schedule-created'

let inMemoryClientsRepository: InMemoryClientsRepository
let inMemoryOrganizationRepository: InMemoryOrganizationsRepository
let inMemorySchedulesRepository: InMemorySchedulingsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotification

describe('On Schedule Created', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    inMemoryOrganizationRepository = new InMemoryOrganizationsRepository()
    inMemorySchedulesRepository = new InMemorySchedulingsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotification(
      inMemoryNotificationsRepository
    )

    vi.spyOn(sendNotificationUseCase, 'execute')

    new OnScheduleCreated(inMemorySchedulesRepository, sendNotificationUseCase)
  })

  it('should be able to send a notification when an schedule is created', async () => {
    const client = makeClient()
    const organizationOwner = makeClient()
    const organization = makeOrganization({
      clientId: organizationOwner.id,
    })
    const schedule = makeScheduling({
      clientId: client.id,
      organizationId: organization.id,
    })

    await inMemoryClientsRepository.create(client)
    await inMemoryClientsRepository.create(organizationOwner)
    await inMemoryOrganizationRepository.create(organization)
    await inMemorySchedulesRepository.create(schedule)

    await waitFor(() => {
      expect(sendNotificationUseCase.execute).toHaveBeenCalled()
    })
  })
})
