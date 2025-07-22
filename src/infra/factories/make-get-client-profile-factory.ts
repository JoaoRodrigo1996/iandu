import { GetClientProfile } from "@/domain/scheduling/application/use-cases/get-client-profile";
import { PrismaClientsRepository } from "../database/prisma/repositories/prisma-clients-repository";

export function makeGetClientProfileFactory() {
  const clientsRepository = new PrismaClientsRepository()
  const useCase = new GetClientProfile(clientsRepository)

  return useCase
}
