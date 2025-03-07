import { type Either, left, right } from '@/core/either'
import type { Encrypter } from '../cryptography/encrypter'
import type { HashComparer } from '../cryptography/hash-comparer'
import type { ClientsRepository } from '../repositories/clients-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateClientRequest {
  email: string
  password: string
}

type AuthenticateClientResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateClient {
  constructor(
    private clientsRepository: ClientsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateClientRequest): Promise<AuthenticateClientResponse> {
    const client = await this.clientsRepository.findByEmail(email)

    if (!client) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      client.password
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: client.id.toString(),
    })

    return right({ accessToken })
  }
}
