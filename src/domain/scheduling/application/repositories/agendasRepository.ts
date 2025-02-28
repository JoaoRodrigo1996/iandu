import type { Agenda } from '../../enterprise/entities/agenda'

export abstract class AgendasRepository {
  abstract create(agenda: Agenda): Promise<void>
  abstract findById(id: string): Promise<Agenda | null>
}
