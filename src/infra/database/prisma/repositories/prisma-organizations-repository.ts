import type { OrganizationsRepository } from '@/domain/scheduling/application/repositories/organizations-repository'
import type { Organization } from '@/domain/scheduling/enterprise/entities/organization'
import { PrismaService } from '..'
import { PrismaOrganizationMapper } from '../mappers/prisma-organization-mapper'

const prisma = new PrismaService()

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(organization: Organization): Promise<void> {
    const data = PrismaOrganizationMapper.toPrisma(organization)

    await prisma.organization.create({ data })
  }

  async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        cnpj,
      },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }

  async findByClientId(clientId: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        clientId,
      },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }

  findById(id: string): Promise<Organization | null> {
    throw new Error('Method not implemented.')
  }

  findByName(name: string): Promise<Organization | null> {
    throw new Error('Method not implemented.')
  }
}
