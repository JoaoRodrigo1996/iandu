import { makeGetClientProfileFactory } from "@/infra/factories/make-get-client-profile-factory";
import { FastifyReply, FastifyRequest } from "fastify";

export class GetClientProfileController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { sub } = request.user as { sub:string }

    const getClientProfileUseCase = makeGetClientProfileFactory()

    const result = await getClientProfileUseCase.execute({ clientId: sub })

    if(result.isLeft()) {
      return reply.status(404).send({ message: result.value.message })
    }

    const client = result.value.client

    return reply.status(200).send({ client: { name: client.name, userName: client.userName, email: client.email, password: client.password } })
  }
}
