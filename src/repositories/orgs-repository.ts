import { org, Prisma } from '@prisma/client'

export interface ORGsRepository {
  create(data: Prisma.orgUncheckedCreateInput): Promise<org>;
  findOrgByEmail(email: string): Promise<org | null>;
  findOrgById(id: string): Promise<org | null>;
}
