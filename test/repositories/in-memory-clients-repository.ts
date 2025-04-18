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

  async findByUserName(userName: string): Promise<Client | null> {
    const client = this.items.find(client => client.userName === userName)

    if (!client) {
      return null
    }

    return client
  }

  async findById(clientId: string): Promise<Client | null> {
    const client = this.items.find(client => client.id.toString() === clientId)

    if (!client) {
      return null
    }

    return client
  }

  async update(client: Client): Promise<void> {
    const index = this.items.findIndex(item => item.id === client.id)

    this.items[index] = client
  }
}
