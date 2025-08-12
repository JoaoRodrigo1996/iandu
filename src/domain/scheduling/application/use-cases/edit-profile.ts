import { type Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/erros/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import type { Client } from '../../enterprise/entities/client'
import type { ClientsRepository } from '../repositories/clients-repository'

interface EditProfileUseCaseRequest {
  client_id: string
  name: string
}

type EditProfileUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    client: Client
  }
>

export class EditProfileUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    client_id,

    name,
  }: EditProfileUseCaseRequest): Promise<EditProfileUseCaseResponse> {
    const client = await this.clientsRepository.findById(client_id)

    if (!client) {
      return left(new ResourceNotFoundError())
    }

    if (client.id.toString() !== client_id) {
      return left(new NotAllowedError())
    }

    client.name = name

    await this.clientsRepository.update(client)

    return right({ client })
  }
}
