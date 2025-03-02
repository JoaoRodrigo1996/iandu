import type { SchedulingsRepository } from '@/domain/scheduling/application/repositories/schedulingsRepository'
import type { Scheduling } from '@/domain/scheduling/enterprise/entities/scheduling'

export class InMemorySchedulingsRepository implements SchedulingsRepository {
  public items: Scheduling[] = []

  async create(agenda: Scheduling): Promise<void> {
    this.items.push(agenda)
  }

  async findById(id: string): Promise<Scheduling | null> {
    const agenda = this.items.find(agenda => agenda.id.tovalue() === id)

    if (!agenda) {
      return null
    }

    return agenda
  }

  async findByClientId(clientId: string): Promise<Scheduling[]> {
    const history = this.items.filter(
      scheduling => scheduling.clientId.toString() === clientId
    )

    return history
  }
}
