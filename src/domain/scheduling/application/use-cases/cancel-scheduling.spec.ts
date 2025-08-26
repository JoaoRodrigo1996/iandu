import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/erros/errors/not-allowed-error'
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
    const newSchedule = makeScheduling(
      {
        clientId: new UniqueEntityID('client-01'),
        date: new Date(Date.now() + 1000 * 60 * 300),
      },
      new UniqueEntityID('schedule-01')
    )

    await inMemorySchedulingsRepository.create(newSchedule)

    const result = await sut.execute({
      client_id: 'client-01',
      scheduling_id: 'schedule-01',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySchedulingsRepository.items).toHaveLength(0)
  })

  it('should not be able to cancel schedule from another user', async () => {
    const newSchedule = makeScheduling({
      clientId: new UniqueEntityID('client-1'),
    })

    inMemorySchedulingsRepository.items.push(newSchedule)

    const result = await sut.execute({
      client_id: 'client-02',
      scheduling_id: newSchedule.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to cancel aa schedule up to 2 hours in advance ', async () => {
    const newSchedule = makeScheduling(
      {
        clientId: new UniqueEntityID('client-01'),
        date: new Date(Date.now() + 1000 * 60 * 180),
      },
      new UniqueEntityID('schedule-01')
    )

    inMemorySchedulingsRepository.items.push(newSchedule)

    const result = await sut.execute({
      client_id: 'client-01',
      scheduling_id: newSchedule.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
