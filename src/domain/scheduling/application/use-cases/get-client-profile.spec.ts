import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { makeClient } from '../../../../../test/factories/make-client'
import { InMemoryClientsRepository } from '../../../../../test/repositories/in-memory-clients-repository'

import { GetClientProfile } from './get-client-profile'

let inMemoryClientsRepository: InMemoryClientsRepository
let sut: GetClientProfile

describe('Get client profile', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new GetClientProfile(inMemoryClientsRepository)
  })

  it('should be able to get client profile', async () => {
    const newClient = makeClient({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    await inMemoryClientsRepository.create(newClient)

    const result = await sut.execute({ clientId: newClient.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.client.email).toEqual(newClient.email)
    }
  })

  it('should not be able to get client profile with wrong id', async () => {
    const result = await sut.execute({
      clientId: 'not-existing-id',
    })

    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
