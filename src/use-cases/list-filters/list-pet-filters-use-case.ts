import { filterArray } from '@/utils/filter-array'

export enum AgeEnum {
  puppy = 'Filhote',
  adult = 'Adulto',
}

export enum PetSizeEnum {
  small = 'Pequeno',
  medium = 'Médio',
  big = 'Grande',
}

export enum EnergyLevelEnum {
  'low' = 1,
  'medium' = 2,
  'high' = 3,
}

export enum IndependencyLevelEnum {
  'low' = 1,
  'medium' = 2,
  'high' = 3,
}

export enum EnvironmentEnum {
  small = 'Pequeno',
  medium = 'Médio',
  big = 'Grande',
}

export enum PetTypeEnum {
  dog = 'cachorro',
  cat = 'gato',
}

export const filters = {
	age: AgeEnum,
	petSize: PetSizeEnum,
	energyLevel: filterArray(Object.values(EnergyLevelEnum), 'number'),
	independencyLevel: filterArray(Object.values(IndependencyLevelEnum), 'number'),
	environment: EnvironmentEnum,
	petType: PetTypeEnum,
}

interface ListPetFiltersUseCaseResponse {
  filters: typeof filters;
}

export class ListPetFiltersUseCase {
	async execute(): Promise<ListPetFiltersUseCaseResponse> {
		return {
			filters,
		}
	}
}
