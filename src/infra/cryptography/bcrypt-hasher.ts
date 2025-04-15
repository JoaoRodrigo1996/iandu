import type { HashComparer } from '@/domain/scheduling/application/cryptography/hash-comparer'
import type { HashGenerator } from '@/domain/scheduling/application/cryptography/hash-generator'

import { compare, hash } from 'bcrypt'

export class BcryptHasher implements HashComparer, HashGenerator {
  private HASH_SALT_LENGTH = 8

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}
