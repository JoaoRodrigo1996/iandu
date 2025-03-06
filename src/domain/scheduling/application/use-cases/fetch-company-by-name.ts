import { type Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import type { Company } from '../../enterprise/entities/company'
import type { CompaniesRepository } from '../repositories/companies-repository'

interface FetchCompanyByNameRequest {
  name: string
}

type FetchCompanyByNameResponse = Either<
  ResourceNotFoundError,
  {
    company: Company
  }
>

export class FetchCompanyByName {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({
    name,
  }: FetchCompanyByNameRequest): Promise<FetchCompanyByNameResponse> {
    const company = await this.companiesRepository.findByName(name)

    if (!company) {
      return left(new ResourceNotFoundError())
    }

    return right({ company })
  }
}
