import { type Either, right } from '@/core/either'
import type { Organization } from '../../enterprise/entities/organization'
import type { OrganizationsRepository } from '../repositories/organizations-repository'

interface FetchAllOrganizationsRequest {
  page: number
}

type FetchAllOrganizationsResponse = Either<
  null,
  { organizations: Organization[] }
>

export class FetchAllOrganizations {
  constructor(private organizationsRepository: OrganizationsRepository) {}
  async execute({
    page,
  }: FetchAllOrganizationsRequest): Promise<FetchAllOrganizationsResponse> {
    const organizations = await this.organizationsRepository.findMany({ page })

    return right({ organizations })
  }
}
