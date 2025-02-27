import type { Company } from '../../enterprise/entities/company'

export abstract class CompaniesRepository {
  abstract create(company: Company): Promise<void>
  abstract findByCnpj(cnpj: string): Promise<Company | null>
}
