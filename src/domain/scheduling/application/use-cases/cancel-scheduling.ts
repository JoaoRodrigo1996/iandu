import { type Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/erros/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import dayjs from 'dayjs'
import type { Scheduling } from '../../enterprise/entities/scheduling'
import type { SchedulingsRepository } from '../repositories/schedulingsRepository'

interface CancelSchedulingUseCaseRequest {
  scheduling_id: string
  client_id: string
}

type CancelSchedulingUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { scheduling: Scheduling }
>

export class CancelSchedulingUseCase {
  constructor(private schedulingsRepository: SchedulingsRepository) {}

  async execute({
    scheduling_id,
    client_id,
  }: CancelSchedulingUseCaseRequest): Promise<CancelSchedulingUseCaseResponse> {
    const scheduling = await this.schedulingsRepository.findById(scheduling_id)

    if (!scheduling) {
      return left(new ResourceNotFoundError())
    }

    if (scheduling?.clientId.toString() !== client_id) {
      return left(new NotAllowedError())
    }

    const scheduleDate = scheduling.date
    const currentDate = new Date()
    const diffInHours = dayjs(scheduleDate).diff(dayjs(currentDate), 'hour')

    if (diffInHours < 2) {
      return left(new NotAllowedError())
    }

    await this.schedulingsRepository.cancel(scheduling)

    return right({ scheduling })
  }
}
