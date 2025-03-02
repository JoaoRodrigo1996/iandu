import { InMemorySchedulingsRepository } from 'test/repositories/in-memory-schedulings-repository'
import { RegisterScheduling } from './register-scheduling'

let inMemoryAgendasRepository: InMemorySchedulingsRepository
let sut: RegisterScheduling

describe('Register new schedule', () => {
  beforeEach(() => {
    inMemoryAgendasRepository = new InMemorySchedulingsRepository()
    sut = new RegisterScheduling(inMemoryAgendasRepository)
  })

  it('should be able to register new schedule', async () => {
    const result = await sut.execute({
      clientId: '1',
      companyId: '1',
      startTime: new Date('2022-01-01 13:00:00'),
      endTime: new Date('2022-01-01 14:00:00'),
      createdAt: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAgendasRepository.items[0]).toEqual(result.value?.schedule)
  })
})
