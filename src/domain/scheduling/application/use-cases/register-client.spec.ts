import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryClientsRepository } from '../../../../../test/repositories/in-memory-clients-repository'
import type { HashGenerator } from '../cryptography/hash-generator'
import { RegisterClient } from './register-client'

let inMemoryClientsRepository: InMemoryClientsRepository
let fakeHasher: FakeHasher
let sut: RegisterClient

describe('Register new client', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new RegisterClient(inMemoryClientsRepository, fakeHasher)
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

  it('should hash the password before saving it', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryClientsRepository.items[0].password).toEqual(hashedPassword)
  })
})
