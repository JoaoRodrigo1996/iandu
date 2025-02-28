import { type Either, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Agenda } from '../../enterprise/entities/agenda'
import type { AgendasRepository } from '../repositories/agendasRepository'

interface RegisterSchedulingRequest {
  companyId: string
  clientId: string
  startTime: Date
  endTime: Date
  createdAt: Date
}

type RegisterSchedulingResponse = Either<
  null,
  {
    schedule: Agenda
  }
>

export class RegisterScheduling {
  constructor(private agendasRepository: AgendasRepository) {}

  async execute({
    companyId,
    clientId,
    startTime,
    endTime,
    createdAt,
  }: RegisterSchedulingRequest): Promise<RegisterSchedulingResponse> {
    const schedule = Agenda.create({
      clientId: new UniqueEntityID(clientId),
      companyId: new UniqueEntityID(companyId),
      startTime,
      endTime,
      createdAt,
    })

    await this.agendasRepository.create(schedule)

    return right({ schedule })
  }
}
