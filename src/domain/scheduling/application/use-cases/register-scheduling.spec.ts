import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeScheduling } from 'test/factories/make-scheduling'
import { InMemorySchedulingsRepository } from 'test/repositories/in-memory-schedulings-repository'
import { ScheduleAlreadyExistsError } from './errors/schedule-already-exists-error'
import { RegisterScheduling } from './register-scheduling'

let inMemorySchedulesRepository: InMemorySchedulingsRepository
let sut: RegisterScheduling

describe('Register new schedule', () => {
  beforeEach(() => {
    inMemorySchedulesRepository = new InMemorySchedulingsRepository()
    sut = new RegisterScheduling(inMemorySchedulesRepository)
  })

  it('should be able to register new schedule', async () => {
    const result = await sut.execute({
      clientId: '1',
      organizationId: '1',
      date: new Date('2022-01-01 13:00:00'),
      createdAt: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      schedule: inMemorySchedulesRepository.items[0],
    })
  })

  it('should not be able to register new schedule with same date', async () => {
    const newSchedule = makeScheduling({
      clientId: new UniqueEntityID('1'),
      date: new Date('2022-01-01 13:00:00'),
    })

    inMemorySchedulesRepository.create(newSchedule)

    const result = await sut.execute({
      clientId: '1',
      organizationId: '1',
      date: newSchedule.date,
      createdAt: new Date(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ScheduleAlreadyExistsError)
  })
})
