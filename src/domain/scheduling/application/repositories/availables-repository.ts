import type { Available } from '../../enterprise/entities/available'

export abstract class AvailablesRepository {
  abstract create(available: Available): Promise<void>
  abstract findByOrganizationId(
    organizationId: string
  ): Promise<Available | null>
  abstract save(available: Available): Promise<void>
}
