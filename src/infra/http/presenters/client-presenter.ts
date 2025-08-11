import type { Client } from '@/domain/scheduling/enterprise/entities/client'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ClientPresenter {
  static toHTTP(client: Client) {
    return {
      userName: client.userName,
      email: client.email,
      name: client.name,
      password: undefined,
    }
  }
}
