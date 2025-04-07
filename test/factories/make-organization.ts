import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  Organization,
  type OrganizationProps,
} from '../../src/domain/scheduling/enterprise/entities/organization'

export function makeOrganization(
  override: Partial<OrganizationProps> = {},
  id?: UniqueEntityID
) {
  const organization = Organization.create(
    {
      name: faker.company.name(),
      cnpj: faker.number.int({ min: 8 }).toString(),
      email: faker.internet.email(),
      address: {
        city: faker.location.city(),
        complement: faker.location.secondaryAddress(),
        zip: faker.location.zipCode(),
        state: faker.location.state(),
        neighborhood: faker.location.county(),
        number: Number(faker.location.buildingNumber()),
        street: faker.location.street(),
      },
      description: faker.lorem.paragraph(),
      ownerId: new UniqueEntityID(),
      phone: faker.phone.number({ style: 'national' }),
      sector: faker.commerce.department(),
      ...override,
    },
    id
  )

  return organization
}
