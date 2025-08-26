import type { Organization } from '@/domain/scheduling/enterprise/entities/organization'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class OrganizationPresenter {
  static toHTTP(organization: Organization) {
    return {
      id: organization.id.toString(),
      clientId: organization.clientId.toString(),
      name: organization.name,
      cnpj: organization.cnpj,
      address: {
        street: organization.address.street,
        number: organization.address.number,
        complement: organization.address.complement,
        neighborhood: organization.address.neighborhood,
        city: organization.address.city,
        state: organization.address.state,
        zip: organization.address.zip,
      },
      email: organization.email,
      phone: organization.phone,
      description: organization.description,
      sector: organization.sector,
    }
  }
}
