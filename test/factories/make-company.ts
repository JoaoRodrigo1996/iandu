import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  Company,
  type CompanyProps,
} from '../../src/domain/scheduling/enterprise/entities/company'

export function makeCompany(
  override: Partial<CompanyProps> = {},
  id?: UniqueEntityID
) {
  const company = Company.create(
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

  return company
}
