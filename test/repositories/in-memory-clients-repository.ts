import type { ClientsRepository } from '../../src/domain/scheduling/application/repositories/clients-repository'
import type { Client } from '../../src/domain/scheduling/enterprise/entities/client'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  async create(client: Client): Promise<void> {
    this.items.push(client)
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = this.items.find(client => client.email === email)

    if (!client) {
      return null
    }

    return client
  }
}
