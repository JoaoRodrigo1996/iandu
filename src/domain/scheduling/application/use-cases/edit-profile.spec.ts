import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeClient } from 'test/factories/make-client'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'
import { EditProfileUseCase } from './edit-profile'

let inMemoryClientsRepository: InMemoryClientsRepository
let sut: EditProfileUseCase

describe('Edit profile', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new EditProfileUseCase(inMemoryClientsRepository)
  })

  it('should be able to edit profile', async () => {
    const newClient = makeClient({}, new UniqueEntityID('client-1'))

    inMemoryClientsRepository.items.push(newClient)

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      client_id: 'client-1',
    })

    expect(inMemoryClientsRepository.items[0]).toMatchObject({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })
  })
})
