import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 20; i++) {
    await prisma.client.create({
      data: {
        name: faker.person.fullName(),
        userName: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        Organization: {
          create: {
            name: faker.company.name(),
            cnpj: faker.number.int({ min: 8 }).toString(),
            email: faker.internet.email(),
            city: faker.location.city(),
            complement: faker.location.secondaryAddress(),
            zip: faker.location.zipCode(),
            state: faker.location.state(),
            neighborhood: faker.location.county(),
            number: Number(faker.location.buildingNumber()),
            street: faker.location.street(),
            description: faker.lorem.paragraph(),
            phone: faker.phone.number({ style: 'national' }),
            sector: faker.commerce.department(),
            Available: {
              create: {
                weekDay: faker.number.int({ min: 0, max: 6 }),
                startTimeInMinutes: faker.number.int({ min: 0, max: 1439 }),
                endTimeInMinutes: faker.number.int({ min: 0, max: 1439 }),
              },
            },
          },
        },
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
  })
