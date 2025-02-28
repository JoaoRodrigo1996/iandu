import type { AgendasRepository } from '@/domain/scheduling/application/repositories/agendasRepository'
import type { Agenda } from '@/domain/scheduling/enterprise/entities/agenda'

export class InMemoryAgendasRepository implements AgendasRepository {
  public items: Agenda[] = []

  async create(agenda: Agenda): Promise<void> {
    this.items.push(agenda)
  }

  async findById(id: string): Promise<Agenda | null> {
    const agenda = this.items.find(agenda => agenda.id.tovalue() === id)

    if (!agenda) {
      return null
    }

    return agenda
  }
}
