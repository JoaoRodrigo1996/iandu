import type { Available } from '@/domain/scheduling/enterprise/entities/available'
import type { AvailablesRepository } from '../../src/domain/scheduling/application/repositories/availables-repository'

export class InMemoryAvailablesRepository implements AvailablesRepository {
  public items: Available[] = []

  async create(available: Available): Promise<void> {
    this.items.push(available)
  }

  async findByOrganizationId(
    organizationId: string
  ): Promise<Available | null> {
    const available = this.items.find(
      item => item.organization_id.toString() === organizationId
    )

    if (!available) {
      return null
    }

    return available
  }

  async save(available: Available): Promise<void> {
    const availableIndex = this.items.findIndex(
      item => item.id === available.id
    )

    this.items[availableIndex] = available
  }
}
