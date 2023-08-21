import { Address, Pet, Prisma } from '@prisma/client'

export type OmmitedPetFields = Omit<
  Pet,
  'id' | 'oRGId' | 'addressId' | 'images' | 'address' | 'name' | 'description'
>;

export type FilterOptions = Partial<OmmitedPetFields>;

export type FilterOptionsKeys = keyof FilterOptions;

export type PetUncheckedCreateWithRelations =
  Prisma.PetUncheckedCreateWithoutAddressInput & {
    address: Address | null;
    addressId: string;
    requirements: Prisma.PetRequirementCreateInput[];
  };

export type PetWithRelations = Prisma.PetGetPayload<{
  include: { address: true; requirements: true };
}>;

export type ListPetsParams = {
  city: string;
} & FilterOptions;

export interface PetsRepository {
  create(data: PetUncheckedCreateWithRelations): Promise<PetWithRelations>;
  getPetById(id: string): Promise<PetWithRelations | null>;
  getPetsByCityOrCharacteristics(
    params: ListPetsParams
  ): Promise<PetWithRelations[]>;
}
