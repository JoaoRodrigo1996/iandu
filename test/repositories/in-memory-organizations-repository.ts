import type { Organization } from '@/domain/scheduling/enterprise/entities/organization'
import type { OrganizationsRepository } from '../../src/domain/scheduling/application/repositories/organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async create(organization: Organization): Promise<void> {
    this.items.push(organization)
  }

  async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = this.items.find(
      organization => organization.cnpj === cnpj
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findByClientId(clientId: string): Promise<Organization | null> {
    const organization = this.items.find(
      item => item.clientId.toString() === clientId
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find(
      organization => organization.id.toString() === id
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findByName(name: string): Promise<Organization | null> {
    const organization = this.items.find(
      organization => organization.name === name
    )

    if (!organization) {
      return null
    }

    return organization
  }
}
