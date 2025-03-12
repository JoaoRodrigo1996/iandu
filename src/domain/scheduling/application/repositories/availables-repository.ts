import type { Available } from '../../enterprise/entities/available'

export abstract class AvailablesRepository {
  abstract create(available: Available): Promise<void>
}
