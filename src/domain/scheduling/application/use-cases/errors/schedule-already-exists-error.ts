import type { UseCaseError } from '../../../../../core/erros/use-case-error'

export class ScheduleAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Schedule "${identifier}" already exists`)
  }
}
