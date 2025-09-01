import { type Either, left, right } from '@/core/either'
import type { NotAllowedError } from '@/core/erros/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import type { Available } from '../../enterprise/entities/available'
import type { AvailablesRepository } from '../repositories/availables-repository'

interface EditAvailableUseCaseRequest {
  organizationId: string
  weekDay: number
  startTimeInMinutes: number
  endTimeInMinutes: number
}

type EditAvailableUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    organizationAvailable: Available
  }
>

export class EditAvailableUseCase {
  constructor(private availablesRepository: AvailablesRepository) {}

  async execute({
    organizationId,
    weekDay,
    startTimeInMinutes,
    endTimeInMinutes,
  }: EditAvailableUseCaseRequest): Promise<EditAvailableUseCaseResponse> {
    const organizationAvailable =
      await this.availablesRepository.findByOrganizationId(organizationId)

    if (!organizationAvailable) {
      return left(new ResourceNotFoundError())
    }

    organizationAvailable.week_day = weekDay
    organizationAvailable.start_time_in_minutes = startTimeInMinutes
    organizationAvailable.end_time_in_minutes = endTimeInMinutes

    await this.availablesRepository.save(organizationAvailable)

    return right({ organizationAvailable })
  }
}
