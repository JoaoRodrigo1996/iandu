import type { Organization } from '../../enterprise/entities/organization'

export abstract class CompaniesRepository {
  abstract create(organization: Organization): Promise<void>
  abstract findByCnpj(cnpj: string): Promise<Organization | null>
  abstract findByName(name: string): Promise<Organization | null>
}
