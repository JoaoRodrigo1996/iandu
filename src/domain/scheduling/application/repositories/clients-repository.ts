import type { Client } from '../../enterprise/entities/client'

export abstract class ClientsRepository {
  abstract create(client: Client): Promise<void>
  abstract findByEmail(email: string): Promise<Client | null>
  abstract findByUserName(userName: string): Promise<Client | null>
}
