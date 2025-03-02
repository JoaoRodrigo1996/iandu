import type { Optional } from '@/core/types/optional'
import { Entity } from '../../../../core/entities/entity'
import type { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface SchedulingProps {
  companyId: UniqueEntityID
  clientId: UniqueEntityID
  startTime: Date
  endTime: Date
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
