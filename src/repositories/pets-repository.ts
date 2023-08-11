import { Pet, Prisma } from '@prisma/client'

export type FilterOptions = Partial<Omit<Pet, 'id' | 'oRGId' | 'addressId'>>

export type FilterOptionsKeys = keyof FilterOptions

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  getPets() : Promise<Pet[]>
}
