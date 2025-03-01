import { type Either, left, right } from '../../../../core/either'
import { ResourceNotFoundError } from '../../../../core/erros/errors/resource-not-found-error'
import type { Client } from '../../enterprise/entities/client'
import type { ClientsRepository } from '../repositories/clients-repository'

interface GetClientByUserNameRequest {
  userName: string
}

type GetClientByUserNameResponse = Either<
  ResourceNotFoundError,
  {
    client: Client
  }
>

export class GetClientByUserName {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    userName,
  }: GetClientByUserNameRequest): Promise<GetClientByUserNameResponse> {
    const client = await this.clientsRepository.findByUserName(userName)

    if (!client) {
      return left(new ResourceNotFoundError())
    }

    return right({ client })
  }
}
