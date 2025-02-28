import { type Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Company } from '../../enterprise/entities/company'
import type { CompaniesRepository } from '../repositories/companies-repository'
import { CompanyAlreadyExistsError } from './errors/company-already-exists-error'

interface RegisterCompanyRequest {
  ownerId: string
  name: string
  cnpj: string
  address: {
    street: string
    number: number
    complement: string
    neighborhood: string
    city: string
    state: string
    zip: string
  }
  email: string
  phone: string
  description: string
  sector: string
  createdAt: Date
}

type RegisterCompanyResponse = Either<
  CompanyAlreadyExistsError,
  {
    company: Company
  }
>

export class RegisterCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({
    ownerId,
    name,
    cnpj,
    address: { street, number, complement, neighborhood, city, state, zip },
    email,
    phone,
    description,
    sector,
    createdAt,
  }: RegisterCompanyRequest): Promise<RegisterCompanyResponse> {
    const companyAlreadyExists =
      await this.companiesRepository.findByCnpj(email)

    if (companyAlreadyExists) {
      return left(new CompanyAlreadyExistsError(email))
    }

    const company = Company.create({
      ownerId: new UniqueEntityID(ownerId),
      name,
      cnpj,
      address: { street, number, complement, neighborhood, city, state, zip },
      email,
      phone,
      description,
      sector,
      createdAt,
    })

    await this.companiesRepository.create(company)

    return right({ company })
  }
}
