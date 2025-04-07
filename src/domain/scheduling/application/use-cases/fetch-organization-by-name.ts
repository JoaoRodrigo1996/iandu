import { type Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import type { Organization } from '../../enterprise/entities/organization'
import type { CompaniesRepository } from '../repositories/companies-repository'

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
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({
    name,
  }: FetchOrganizationByNameRequest): Promise<FetchOrganizationByNameResponse> {
    const organization = await this.companiesRepository.findByName(name)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    return right({ organization })
  }
}
