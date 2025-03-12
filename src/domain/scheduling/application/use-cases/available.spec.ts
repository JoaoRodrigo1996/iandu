import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAvailablesRepository } from 'test/repositories/in-memory-availables-respository'
import { AvailableUseCase } from './available'

let inMemoryAvailablesRespoitory: InMemoryAvailablesRepository
let sut: AvailableUseCase

describe('Register available time', () => {
  beforeEach(() => {
    inMemoryAvailablesRespoitory = new InMemoryAvailablesRepository()
    sut = new AvailableUseCase(inMemoryAvailablesRespoitory)
  })

  it('should be able to create available time', async () => {
    const result = await sut.execute({
      company_id: 'company-01',
      end_time_in_minutes: 360,
      start_time_in_minutes: 420,
      week_day: 2,
    })

    expect(result.value?.available.company_id).toEqual(
      new UniqueEntityID('company-01')
    )
  })
})
