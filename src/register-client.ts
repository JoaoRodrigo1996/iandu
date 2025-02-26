import { Client } from './client'
import { ClientAlreadyExistsError } from './client-already-exists-error'
import type { ClientsRepository } from './clients-repository'
import { type Either, left, right } from './either'

interface RegisterClientRequest {
  name: string
  email: string
  password: string
}

type RegisterClientResponse = Either<
  ClientAlreadyExistsError,
  {
    client: Client
  }
>

export class RegisterClient {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterClientRequest): Promise<RegisterClientResponse> {
    const clientAlreadyExists = await this.clientsRepository.findByEmail(email)

    if (clientAlreadyExists) {
      return left(new ClientAlreadyExistsError(email))
    }

    const client = Client.create({ name, email, password })

    await this.clientsRepository.create(client)

    return right({ client })
  }
}
