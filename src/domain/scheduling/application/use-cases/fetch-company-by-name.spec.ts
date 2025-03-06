import { makeCompany } from 'test/factories/make-company'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies-repository'
import { FetchCompanyByName } from './fetch-company-by-name'

let inMemoryCompaniesRespository: InMemoryCompaniesRepository
let sut: FetchCompanyByName

describe('Fetch client scheduling history', () => {
  beforeEach(() => {
    inMemoryCompaniesRespository = new InMemoryCompaniesRepository()
    sut = new FetchCompanyByName(inMemoryCompaniesRespository)
  })

  it('should be able to fetch a company by name', async () => {
    const newCompany = makeCompany({
      name: 'Amazon Web Services',
    })

    inMemoryCompaniesRespository.create(newCompany)

    const result = await sut.execute({ name: 'Amazon Web Services' })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.company.name).toEqual(newCompany.name)
    }
  })
})
