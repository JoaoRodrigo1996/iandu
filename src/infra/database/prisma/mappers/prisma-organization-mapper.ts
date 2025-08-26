import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Organization } from '@/domain/scheduling/enterprise/entities/organization'
import type { Prisma, Organization as PrismaOrganization } from '@prisma/client'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaOrganizationMapper {
  static toDomain(raw: PrismaOrganization): Organization {
    return Organization.create(
      {
        clientId: new UniqueEntityID(raw.clientId),
        address: {
          city: raw.city,
          complement: raw.complement,
          neighborhood: raw.neighborhood,
          number: raw.number,
          state: raw.state,
          street: raw.street,
          zip: raw.zip,
        },
        cnpj: raw.cnpj,
        description: raw.description,
        email: raw.email,
        name: raw.name,
        phone: raw.phone,
        sector: raw.sector,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(
    organization: Organization
  ): Prisma.OrganizationUncheckedCreateInput {
    return {
      id: organization.id.toString(),
      clientId: organization.clientId.toString(),
      cnpj: organization.cnpj,
      description: organization.description,
      email: organization.email,
      name: organization.name,
      phone: organization.phone,
      sector: organization.sector,
      city: organization.address.city,
      complement: organization.address.complement,
      neighborhood: organization.address.neighborhood,
      number: organization.address.number,
      state: organization.address.state,
      street: organization.address.street,
      zip: organization.address.zip,
    }
  }
}
