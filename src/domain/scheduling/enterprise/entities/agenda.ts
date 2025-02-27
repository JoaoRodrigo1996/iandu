import type { Optional } from '@/core/types/optional'
import { Entity } from '../../../../core/entities/entity'
import type { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

interface AgendaProps {
  companyId: string
  clientId: string
  startTime: Date
  endTime: Date
  createdAt: Date
  updatedAt?: Date
}

export class Agenda extends Entity<AgendaProps> {
  get companyId() {
    return this.props.companyId
  }

  get clientId() {
    return this.props.clientId
  }

  get startTime() {
    return this.props.startTime
  }

  set startTime(startTime: Date) {
    this.props.startTime = startTime
    this.touch()
  }

  get endTime() {
    return this.props.endTime
  }

  set endTime(endTime: Date) {
    this.props.endTime = endTime
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<AgendaProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const agenda = new Agenda(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    )

    return agenda
  }
}
