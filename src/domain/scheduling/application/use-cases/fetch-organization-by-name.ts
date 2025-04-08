import { type Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import type { Organization } from '../../enterprise/entities/organization'
import type { OrganizationsRepository } from '../repositories/organizations-repository'

interface FetchOrganizationByNameRequest {
  name: string
}

type FetchOrganizationByNameResponse = Either<
  ResourceNotFoundError,
  {
    organization: Organization
  }
>

export class FetchOrganizationByName {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
  }: FetchOrganizationByNameRequest): Promise<FetchOrganizationByNameResponse> {
    const organization = await this.organizationsRepository.findByName(name)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    return right({ organization })
  }
}
