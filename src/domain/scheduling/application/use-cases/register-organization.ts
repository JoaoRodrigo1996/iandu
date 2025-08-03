import { type Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Organization } from '../../enterprise/entities/organization'
import type { OrganizationsRepository } from '../repositories/organizations-repository'
import { ClientAlreadyOwnsAnOrganizationError } from './errors/client-already-owns-organization'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationRequest {
  clientId: string
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
}

type RegisterOrganizationResponse = Either<
  OrganizationAlreadyExistsError,
  {
    organization: Organization
  }
>

export class RegisterOrganization {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    clientId,
    name,
    cnpj,
    address: { street, number, complement, neighborhood, city, state, zip },
    email,
    phone,
    description,
    sector,
  }: RegisterOrganizationRequest): Promise<RegisterOrganizationResponse> {
    const organizationAlreadyExists =
      await this.organizationsRepository.findByCnpj(cnpj)

    if (organizationAlreadyExists) {
      return left(new OrganizationAlreadyExistsError(cnpj))
    }

    const clientalreadyOwnsOrganization =
      await this.organizationsRepository.findByClientId(clientId)

    if (clientalreadyOwnsOrganization) {
      return left(new ClientAlreadyOwnsAnOrganizationError(clientId))
    }

    const organization = Organization.create({
      clientId: new UniqueEntityID(clientId),
      name,
      cnpj,
      address: { street, number, complement, neighborhood, city, state, zip },
      email,
      phone,
      description,
      sector,
    })

    await this.organizationsRepository.create(organization)

    return right({ organization })
  }
}
