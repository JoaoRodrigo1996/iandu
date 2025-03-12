import { type Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Available } from '../../enterprise/entities/available'
import type { AvailablesRepository } from '../repositories/availables-repository'

interface AvailableRequest {
  company_id: string
  week_day: number
  start_time_in_minutes: number
  end_time_in_minutes: number
}

type AvailableResponse = Either<null, { available: Available }>

export class AvailableUseCase {
  constructor(private availablesRepository: AvailablesRepository) {}

  async execute({
    week_day,
    start_time_in_minutes,
    end_time_in_minutes,
    company_id,
  }: AvailableRequest): Promise<AvailableResponse> {
    const available = Available.create({
      company_id: new UniqueEntityID(company_id),
      start_time_in_minutes,
      end_time_in_minutes,
      week_day,
    })

    await this.availablesRepository.create(available)

    return right({ available })
  }
}
