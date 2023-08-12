import { Pet, Prisma } from '@prisma/client'

type OptionalFields<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type FilterOptions = Partial<Omit<Pet, 'id' | 'oRGId' | 'addressId' | 'images'>>

export type FilterOptionsKeys = keyof FilterOptions

export type PetWithRelations = Prisma.PetGetPayload<{
  include: { requirements: true, address: true }
}>

export type PetsRepositoryCreateParams = OptionalFields<PetWithRelations, 'id'>

export type FilterPetsParams = {
  city: string
} & FilterOptions

export interface PetsRepository {
  create(data: PetsRepositoryCreateParams): Promise<PetWithRelations>;
  getPetById(id: string) : Promise<PetWithRelations | null>
  filterPetsByCityOrCharacteristics(params : FilterPetsParams) : Promise<PetWithRelations[]>
}
