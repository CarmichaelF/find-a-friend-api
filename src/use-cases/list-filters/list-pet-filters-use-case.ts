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

interface ListPetFiltersUseCaseResponse {
  filters: {
    age: typeof AgeEnum;
    petSize: typeof PetSizeEnum;
    energyLevel: typeof EnergyLevelEnum;
    independencyLevel: typeof IndependencyLevelEnum;
    environment: typeof EnvironmentEnum;
    petType: typeof PetTypeEnum;
  };
}

export const filters = {
	age: AgeEnum,
	petSize: PetSizeEnum,
	energyLevel: EnergyLevelEnum,
	independencyLevel: IndependencyLevelEnum,
	environment: EnvironmentEnum,
	petType: PetTypeEnum,
}

export class ListPetFiltersUseCase {
	async execute(): Promise<ListPetFiltersUseCaseResponse> {
		return {
			filters,
		}
	}
}
