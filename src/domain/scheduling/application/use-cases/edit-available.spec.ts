import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAvailable } from 'test/factories/make-available'
import { InMemoryAvailablesRepository } from 'test/repositories/in-memory-availables-respository'
import { EditAvailableUseCase } from './edit-available'

let inMemoryAvailablesRepository: InMemoryAvailablesRepository
let sut: EditAvailableUseCase

describe('Edit profile', () => {
  beforeEach(() => {
    inMemoryAvailablesRepository = new InMemoryAvailablesRepository()
    sut = new EditAvailableUseCase(inMemoryAvailablesRepository)
  })

  it('should be able to edit profile', async () => {
    const newAvailable = makeAvailable({
      organization_id: new UniqueEntityID('organization-1'),
    })

    inMemoryAvailablesRepository.items.push(newAvailable)

    const result = await sut.execute({
      organizationId: 'organization-1',
      weekDay: 2,
      startTimeInMinutes: 500,
      endTimeInMinutes: 1000,
    })

    expect(inMemoryAvailablesRepository.items[0]).toHaveProperty('week_day', 2)
  })
})
