import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeClient } from 'test/factories/make-client'
import { InMemoryClientsRepository } from '../../../../../test/repositories/in-memory-clients-repository'
import { AuthenticateClient } from './authenticate-client'

let inMemoryClientsRepository: InMemoryClientsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateClient

describe('Authenticate client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeHasher = new FakeHasher()
    sut = new AuthenticateClient(
      inMemoryClientsRepository,
      fakeHasher,
      fakeEncrypter
    )
  })

  it('should be able to authenticate a client', async () => {
    const newClient = makeClient({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryClientsRepository.items.push(newClient)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
