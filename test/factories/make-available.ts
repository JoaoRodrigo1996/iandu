import type { PrismaService } from '@/infra/database/prisma'
import { PrismaAvailableMapper } from '@/infra/database/prisma/mappers/prisma-available-mapper'
import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  Available,
  type AvailableProps,
} from '../../src/domain/scheduling/enterprise/entities/available'

export function makeAvailable(
  override: Partial<AvailableProps> = {},
  id?: UniqueEntityID
) {
  const available = Available.create(
    {
      week_day: faker.number.int({ min: 0, max: 6 }),
      start_time_in_minutes: faker.number.int({ min: 0, max: 1439 }),
      end_time_in_minutes: faker.number.int({ min: 0, max: 1439 }),
      organization_id: new UniqueEntityID(),
      ...override,
    },
    id
  )

  return available
}

export class AvailableFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAvailable(
    data: Partial<AvailableProps> = {}
  ): Promise<Available> {
    const available = makeAvailable(data)

    await this.prisma.organizationAvailableTimes.create({
      data: PrismaAvailableMapper.toPrisma(available),
    })

    return available
  }
}
