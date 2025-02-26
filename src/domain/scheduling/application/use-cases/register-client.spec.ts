import { InMemoryClientsRepository } from '../../../../../test/repositories/in-memory-clients-repository'
import { RegisterClient } from './register-client'

let inMemoryClientsRepository: InMemoryClientsRepository
let sut: RegisterClient

describe('Register new client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new RegisterClient(inMemoryClientsRepository)
  })

  it('should be able to register a new client', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      client: inMemoryClientsRepository.items[0],
    })
  })
})
