import type { UseCaseError } from '../../../../../core/erros/use-case-error'

export class OrganizationAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Client "${identifier}" already exists`)
  }
}
