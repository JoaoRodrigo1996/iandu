import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { OrganizationsRepository } from '@/domain/scheduling/application/repositories/organizations-repository'
import type { Organization } from '@/domain/scheduling/enterprise/entities/organization'
import type { PrismaService } from '..'
import { PrismaOrganizationMapper } from '../mappers/prisma-organization-mapper'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(organization: Organization): Promise<void> {
    const data = PrismaOrganizationMapper.toPrisma(organization)

    await this.prisma.organization.create({ data })
  }

  async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        cnpj,
      },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }

  async findMany(params: PaginationParams): Promise<Organization[]> {
    const organizations = await this.prisma.organization.findMany({
      skip: (params.page - 1) * 20,
      take: 20,
    })

    return organizations.map(PrismaOrganizationMapper.toDomain)
  }

  async findByClientId(clientId: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        clientId,
      },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id,
      },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }

  async findByName(name: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findFirst({
      where: {
        name,
      },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }
}
