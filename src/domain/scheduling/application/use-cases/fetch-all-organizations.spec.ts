import { makeOrganization } from 'test/factories/make-organization'
import { InMemoryOrganizationsRepository } from 'test/repositories/in-memory-organizations-repository'
import { FetchAllOrganizations } from './fetch-all-organizations'

let inMemoryOrganizationsRespository: InMemoryOrganizationsRepository
let sut: FetchAllOrganizations

describe('Fetch organization', () => {
  beforeEach(() => {
    inMemoryOrganizationsRespository = new InMemoryOrganizationsRepository()
    sut = new FetchAllOrganizations(inMemoryOrganizationsRespository)
  })

  it('should be able to fetch all organization', async () => {
    await inMemoryOrganizationsRespository.create(
      makeOrganization({ createdAt: new Date(2025, 0, 16) })
    )

    await inMemoryOrganizationsRespository.create(
      makeOrganization({ createdAt: new Date(2025, 0, 18) })
    )

    await inMemoryOrganizationsRespository.create(
      makeOrganization({ createdAt: new Date(2025, 0, 20) })
    )

    const result = await sut.execute({ page: 1 })

    expect(result.value?.organizations).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 16) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
    ])
  })

  it('should be able to fetch a organization by name', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryOrganizationsRespository.create(makeOrganization())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.organizations).toHaveLength(2)
  })
})
