import { type Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Organization } from '../../enterprise/entities/organization'
import type { CompaniesRepository } from '../repositories/companies-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationRequest {
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

type RegisterOrganizationResponse = Either<
  OrganizationAlreadyExistsError,
  {
    organization: Organization
  }
>

export class RegisterOrganization {
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
  }: RegisterOrganizationRequest): Promise<RegisterOrganizationResponse> {
    const organizationAlreadyExists =
      await this.companiesRepository.findByCnpj(email)

    if (organizationAlreadyExists) {
      return left(new OrganizationAlreadyExistsError(email))
    }

    const organization = Organization.create({
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

    await this.companiesRepository.create(organization)

    return right({ organization })
  }
}
