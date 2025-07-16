import type { Encrypter } from '@/domain/scheduling/application/cryptography/encrypter'
import type { FastifyInstance } from 'fastify'

export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: FastifyInstance) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.jwt.sign(payload)
  }
}
