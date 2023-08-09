import { ORG, Prisma } from '@prisma/client'

export interface ORGsRepository {
  create(data: Prisma.ORGUncheckedCreateInput): Promise<ORG>;
  findOrgByEmail(email: string): Promise<ORG | null>;
  findOrgById(id: string): Promise<ORG | null>;
}
