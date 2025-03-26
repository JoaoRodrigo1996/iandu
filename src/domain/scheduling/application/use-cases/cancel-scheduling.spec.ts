import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeScheduling } from 'test/factories/make-scheduling'
import { InMemorySchedulingsRepository } from 'test/repositories/in-memory-schedulings-repository'
import { CancelSchedulingUseCase } from './cancel-scheduling'

let inMemorySchedulingsRepository: InMemorySchedulingsRepository
let sut: CancelSchedulingUseCase

describe('Cancel scheduling', () => {
  beforeEach(() => {
    inMemorySchedulingsRepository = new InMemorySchedulingsRepository()
    sut = new CancelSchedulingUseCase(inMemorySchedulingsRepository)
  })

  it('should be able to cancel schedule', async () => {
    const newSchedule = makeScheduling({
      clientId: new UniqueEntityID('client-01'),
    })

    await inMemorySchedulingsRepository.create(newSchedule)

    const result = await sut.execute({
      client_id: newSchedule.clientId.toString(),
      scheduling_id: newSchedule.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySchedulingsRepository.items).toHaveLength(0)
  })
})
