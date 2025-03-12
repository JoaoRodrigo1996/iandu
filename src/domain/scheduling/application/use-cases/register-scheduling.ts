import { type Either, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Scheduling } from '../../enterprise/entities/scheduling'
import type { SchedulingsRepository } from '../repositories/schedulingsRepository'

interface RegisterSchedulingRequest {
  companyId: string
  clientId: string
  date: Date
  createdAt: Date
}

type RegisterSchedulingResponse = Either<
  null,
  {
    schedule: Scheduling
  }
>

export class RegisterScheduling {
  constructor(private agendasRepository: SchedulingsRepository) {}

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

    await this.agendasRepository.create(schedule)

    return right({ schedule })
  }
}
