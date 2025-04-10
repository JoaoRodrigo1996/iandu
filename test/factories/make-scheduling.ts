import {
  Scheduling,
  type SchedulingProps,
} from '@/domain/scheduling/enterprise/entities/scheduling'
import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'

export function makeScheduling(
  override: Partial<SchedulingProps> = {},
  id?: UniqueEntityID
) {
  const scheduling = Scheduling.create(
    {
      clientId: new UniqueEntityID(),
      organizationId: new UniqueEntityID(),
      date: new Date(),
      ...override,
    },
    id
  )

  return scheduling
}
