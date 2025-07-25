import type { UseCaseError } from '../../../../../core/erros/use-case-error'

export class ScheduleAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super(`Schedule already exists`)
  }
}
