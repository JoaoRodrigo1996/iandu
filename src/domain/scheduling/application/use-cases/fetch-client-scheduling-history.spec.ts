import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeScheduling } from 'test/factories/make-scheduling'
import { InMemorySchedulingsRepository } from 'test/repositories/in-memory-schedulings-repository'
import { FetchClientSchedulingsHistoryUseCase } from './fetch-client-scheduling-history'

let inMemorySchedulingsRepository: InMemorySchedulingsRepository
let sut: FetchClientSchedulingsHistoryUseCase

describe('Fetch client scheduling history', () => {
  beforeEach(() => {
    inMemorySchedulingsRepository = new InMemorySchedulingsRepository()
    sut = new FetchClientSchedulingsHistoryUseCase(
      inMemorySchedulingsRepository
    )
  })

  it('should be able to fetch client scheduling history', async () => {
    await inMemorySchedulingsRepository.create(
      makeScheduling({
        clientId: new UniqueEntityID('client-1'),
        createdAt: new Date(2023, 0, 20),
      })
    )

    await inMemorySchedulingsRepository.create(
      makeScheduling({
        clientId: new UniqueEntityID('client-1'),
        createdAt: new Date(2023, 0, 20),
      })
    )

    await inMemorySchedulingsRepository.create(
      makeScheduling({
        clientId: new UniqueEntityID('client-1'),
        createdAt: new Date(2023, 0, 20),
      })
    )

    const result = await sut.execute({ clientId: 'client-1' })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.history).toHaveLength(3)
    }
  })
})
