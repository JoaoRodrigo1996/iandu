import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeClient } from 'test/factories/make-client'
import { InMemoryClientsRepository } from '../../../../../test/repositories/in-memory-clients-repository'
import { ClientAlreadyExistsError } from './errors/client-already-exists-error'
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
      userName: 'johndoe',
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
      userName: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryClientsRepository.items[0].password).toEqual(hashedPassword)
  })

  it("shouldn't be able to register a new client with an already used email", async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      userName: 'johndoe',
      email: email,
      password: '123456',
    })

    const result = await sut.execute({
      name: 'John Doe',
      userName: 'johndoe',
      email: email,
      password: '123456',
    })

    console.log(result)

    expect(result.value).toBeInstanceOf(ClientAlreadyExistsError)
  })
})
