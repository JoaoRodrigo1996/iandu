import type { UseCaseError } from '../../../../../core/erros/use-case-error'

export class MemberAlreadyRegisteredError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Member "${identifier}" already registered`)
  }
}
