import type { UseCaseError } from '../../../../../core/erros/use-case-error'

export class ClientAlreadyOwnsAnOrganizationError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Client "${identifier}" already owns an organization `)
  }
}
