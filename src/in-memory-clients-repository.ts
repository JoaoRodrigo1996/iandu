import type { Client } from './client'
import type { ClientsRepository } from './clients-repository'

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
