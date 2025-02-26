import type { UseCaseError } from './use-case-error'

export class ClientAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Client "${identifier}" already exists`)
  }
}
