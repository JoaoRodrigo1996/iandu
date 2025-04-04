import type { UseCaseError } from '@/core/erros/use-case-error'

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Credentials are not valid!')
  }
}
