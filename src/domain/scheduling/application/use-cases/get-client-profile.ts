import { type Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import type { Client } from '../../enterprise/entities/client'
import type { ClientsRepository } from '../repositories/clients-repository'

interface GetClientProfileRequest {
  clientId: string
}

type GetClientProfileResponse = Either<
  ResourceNotFoundError,
  { client: Client }
>

export class GetClientProfile {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    clientId,
  }: GetClientProfileRequest): Promise<GetClientProfileResponse> {
    const client = await this.clientsRepository.findById(clientId)

    if (!client) {
      return left(new ResourceNotFoundError())
    }

    return right({ client })
  }
}
