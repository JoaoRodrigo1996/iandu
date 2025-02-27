import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies-repository'
import { RegisterCompany } from './register-company'

let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let sut: RegisterCompany

describe('Register new client', () => {
  beforeEach(() => {
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    sut = new RegisterCompany(inMemoryCompaniesRepository)
  })

  it('should be able to register a new client', async () => {
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
      description: 'A company description',
      sector: 'Services',
      phone: '(99) 99999-9999',
      createdAt: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      company: inMemoryCompaniesRepository.items[0],
    })
  })
})
