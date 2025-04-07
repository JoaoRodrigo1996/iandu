import type { Organization } from '@/domain/scheduling/enterprise/entities/organization'
import type { CompaniesRepository } from '../../src/domain/scheduling/application/repositories/companies-repository'

export class InMemoryCompaniesRepository implements CompaniesRepository {
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
