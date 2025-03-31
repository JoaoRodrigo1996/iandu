import { type Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Scheduling } from '../../enterprise/entities/scheduling'
import type { SchedulingsRepository } from '../repositories/schedulingsRepository'
import { ScheduleAlreadyExistsError } from './errors/schedule-already-exists-error'

interface RegisterSchedulingRequest {
  companyId: string
  clientId: string
  date: Date
  createdAt: Date
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
    companyId,
    clientId,
    date,
    createdAt,
  }: RegisterSchedulingRequest): Promise<RegisterSchedulingResponse> {
    const schedule = Scheduling.create({
      clientId: new UniqueEntityID(clientId),
      companyId: new UniqueEntityID(companyId),
      date,
      createdAt,
    })

    const scheduleAlreadyExists =
      await this.schedulesRepository.findByClientIdAndDate(
        clientId,
        schedule.date
      )

    if (scheduleAlreadyExists) {
      return left(new ScheduleAlreadyExistsError(schedule.id.toString()))
    }

    await this.schedulesRepository.create(schedule)

    return right({ schedule })
  }
}
