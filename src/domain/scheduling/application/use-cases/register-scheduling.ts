import { type Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Scheduling } from '../../enterprise/entities/scheduling'
import type { SchedulingsRepository } from '../repositories/schedulingsRepository'
import { ScheduleAlreadyExistsError } from './errors/schedule-already-exists-error'

interface RegisterSchedulingRequest {
  organizationId: string
  clientId: string
  date: Date
}

type RegisterSchedulingResponse = Either<
  ScheduleAlreadyExistsError,
  {
    schedule: Scheduling
  }
>

export class RegisterScheduling {
  constructor(private schedulesRepository: SchedulingsRepository) {}

  async execute({
    organizationId,
    clientId,
    date,    
  }: RegisterSchedulingRequest): Promise<RegisterSchedulingResponse> {
    const schedule = Scheduling.create({
      clientId: new UniqueEntityID(clientId),
      organizationId: new UniqueEntityID(organizationId),
      date      
    })

    const scheduleAlreadyExists =
      await this.schedulesRepository.findByClientIdOrganizationIdAndDate(
        clientId,
        organizationId,
        schedule.date
      )

    if (scheduleAlreadyExists) {
      return left(new ScheduleAlreadyExistsError())
    }

    await this.schedulesRepository.create(schedule)

    return right({ schedule })
  }
}
