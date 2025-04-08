import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { RegisterOrganization } from './register-organization'

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganization

describe('Register new organization', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganization(inMemoryOrganizationsRepository)
  })

  it('should be able to register a new organization', async () => {
    const result = await sut.execute({
      ownerId: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: {
        city: 'Miami',
        complement: 'Apt 123',
        neighborhood: 'Downtown',
        number: 123,
        state: 'FL',
        street: 'Main St',
        zip: '12345',
      },
      cnpj: '12345678901234',
      description: 'A organization description',
      sector: 'Services',
      phone: '(99) 99999-9999',
      createdAt: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      organization: inMemoryOrganizationsRepository.items[0],
    })
  })
})
