import { makeClient } from '../../../../../test/factories/make-client'
import { InMemoryClientsRepository } from '../../../../../test/repositories/in-memory-clients-repository'
import { GetClientByUserName } from './get-client-by-user-name'

let inMemoryClientsRepository: InMemoryClientsRepository
let sut: GetClientByUserName

describe('Register new client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new GetClientByUserName(inMemoryClientsRepository)
  })

  it('should be able to register a new client', async () => {
    const newClient = makeClient({
      userName: 'john_doe',
    })

    await inMemoryClientsRepository.create(newClient)

    const result = await sut.execute({
      userName: 'john_doe',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.client.userName).toBe(newClient.userName)
    }
  })
})
