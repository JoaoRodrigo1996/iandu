import { type Either, left, right } from '../../../../core/either'
import { Client } from '../../enterprise/entities/client'
import type { HashGenerator } from '../cryptography/hash-generator'
import type { ClientsRepository } from '../repositories/clients-repository'
import { ClientAlreadyExistsError } from './errors/client-already-exists-error'

interface RegisterClientRequest {
  name: string
  userName: string
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
  constructor(
    private clientsRepository: ClientsRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    userName,
    email,
    password,
  }: RegisterClientRequest): Promise<RegisterClientResponse> {
    const clientAlreadyExists = await this.clientsRepository.findByEmail(email)

    if (clientAlreadyExists) {
      return left(new ClientAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const client = Client.create({
      name,
      userName,
      email,
      password: hashedPassword,
    })

    await this.clientsRepository.create(client)

    return right({ client })
  }
}
