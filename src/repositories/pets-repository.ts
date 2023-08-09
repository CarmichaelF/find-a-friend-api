import { Pet, Prisma } from '@prisma/client'

export type FilterOptions = Partial<Omit<Pet, 'id' | 'oRGId'>>

export type FilterOptionsKeys = keyof FilterOptions

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  getPetsByCharacteristics(query: FilterOptions) : Promise<Pet[]>
}
