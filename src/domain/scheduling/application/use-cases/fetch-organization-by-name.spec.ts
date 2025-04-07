import { makeOrganization } from 'test/factories/make-organization'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies-repository'
import { FetchOrganizationByName } from './fetch-organization-by-name'

let inMemoryCompaniesRespository: InMemoryCompaniesRepository
let sut: FetchOrganizationByName

describe('Fetch organization', () => {
  beforeEach(() => {
    inMemoryCompaniesRespository = new InMemoryCompaniesRepository()
    sut = new FetchOrganizationByName(inMemoryCompaniesRespository)
  })

  it('should be able to fetch a organization by name', async () => {
    const newOrganization = makeOrganization({
      name: 'Amazon Web Services',
    })

    inMemoryCompaniesRespository.create(newOrganization)

    const result = await sut.execute({ name: 'Amazon Web Services' })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.organization.name).toEqual(newOrganization.name)
    }
  })
})
