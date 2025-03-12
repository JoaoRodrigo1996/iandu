import type { Available } from '@/domain/scheduling/enterprise/entities/available'
import type { AvailablesRepository } from '../../src/domain/scheduling/application/repositories/availables-repository'

export class InMemoryAvailablesRepository implements AvailablesRepository {
  public items: Available[] = []

  async create(available: Available): Promise<void> {
    this.items.push(available)
  }
}
