import type { Optional } from '@/core/types/optional'
import { Entity } from '../../../../core/entities/entity'
import type { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface SchedulingProps {
  companyId: UniqueEntityID
  clientId: UniqueEntityID
  date: Date
  createdAt: Date
  updatedAt?: Date
}

export class Scheduling extends Entity<SchedulingProps> {
  get companyId() {
    return this.props.companyId
  }

  get clientId() {
    return this.props.clientId
  }

  get date() {
    return this.props.date
  }

  set date(date: Date) {
    this.props.date = date
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<SchedulingProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const scheduling = new Scheduling(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return scheduling
  }
}
