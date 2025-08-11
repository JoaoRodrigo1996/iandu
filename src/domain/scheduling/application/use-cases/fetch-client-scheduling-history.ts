import { type Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import type { Scheduling } from '../../enterprise/entities/scheduling'
import type { SchedulingsRepository } from '../repositories/schedulingsRepository'

interface FetchClientSchedulingsHistoryRequest {
  clientId: string
}

type FetchClientSchedulingsHistoryResponse = Either<
  ResourceNotFoundError | Error,
  {
    history: Scheduling[]
  }
>

export class FetchClientSchedulingsHistoryUseCase {
  constructor(private readonly schedulingRepository: SchedulingsRepository) {}

  async execute({
    clientId,
  }: FetchClientSchedulingsHistoryRequest): Promise<FetchClientSchedulingsHistoryResponse> {
    const history = await this.schedulingRepository.findByClientId(clientId)

    if (!history) {
      return left(new ResourceNotFoundError())
    }

    return right({ history })
  }
}
