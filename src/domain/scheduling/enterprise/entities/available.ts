import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AvailableProps {
  week_day: number
  start_time_in_minutes: number
  end_time_in_minutes: number

  company_id: string
}

export class Available extends Entity<AvailableProps> {
  get week_day() {
    return this.props.week_day
  }

  set week_day(week_day: number) {
    this.props.week_day = week_day
  }

  get start_time_in_minutes() {
    return this.props.start_time_in_minutes
  }

  set start_time_in_minutes(start_time_in_minutes: number) {
    this.props.start_time_in_minutes = start_time_in_minutes
  }

  get end_time_in_minutes() {
    return this.props.end_time_in_minutes
  }

  set end_time_in_minutes(end_time_in_minutes: number) {
    this.props.end_time_in_minutes = end_time_in_minutes
  }

  get company_id() {
    return this.props.company_id
  }

  static create(props: AvailableProps, id?: UniqueEntityID) {
    const available = new Available(props, id)

    return available
  }
}
