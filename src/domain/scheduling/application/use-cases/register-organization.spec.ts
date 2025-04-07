import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies-repository'
import { RegisterOrganization } from './register-organization'

let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let sut: RegisterOrganization

describe('Register new organization', () => {
  beforeEach(() => {
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    sut = new RegisterOrganization(inMemoryCompaniesRepository)
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
      organization: inMemoryCompaniesRepository.items[0],
    })
  })
})
