import type { Company } from '@/domain/scheduling/enterprise/entities/company'
import type { CompaniesRepository } from '../../src/domain/scheduling/application/repositories/companies-repository'

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = []

  async create(company: Company): Promise<void> {
    this.items.push(company)
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const company = this.items.find(company => company.cnpj === cnpj)

    if (!company) {
      return null
    }

    return company
  }

  async findByName(name: string): Promise<Company | null> {
    const company = this.items.find(company => company.name === name)

    if (!company) {
      return null
    }

    return company
  }
}
