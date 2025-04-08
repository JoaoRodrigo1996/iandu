import { makeOrganization } from 'test/factories/make-organization'
import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { FetchOrganizationByName } from './fetch-organization-by-name'

let inMemoryOrganizationsRespository: InMemoryOrganizationsRepository
let sut: FetchOrganizationByName

describe('Fetch organization', () => {
  beforeEach(() => {
    inMemoryOrganizationsRespository = new InMemoryOrganizationsRepository()
    sut = new FetchOrganizationByName(inMemoryOrganizationsRespository)
  })

  it('should be able to fetch a organization by name', async () => {
    const newOrganization = makeOrganization({
      name: 'Amazon Web Services',
    })

    inMemoryOrganizationsRespository.create(newOrganization)

    const result = await sut.execute({ name: 'Amazon Web Services' })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.organization.name).toEqual(newOrganization.name)
    }
  })
})
