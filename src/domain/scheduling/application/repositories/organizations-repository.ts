import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { Organization } from '../../enterprise/entities/organization'

export abstract class OrganizationsRepository {
  abstract create(organization: Organization): Promise<void>
  abstract findByCnpj(cnpj: string): Promise<Organization | null>
  abstract findByClientId(clientId: string): Promise<Organization | null>
  abstract findById(id: string): Promise<Organization | null>
  abstract findByName(name: string): Promise<Organization | null>
  abstract findMany(params: PaginationParams): Promise<Organization[]>
}
