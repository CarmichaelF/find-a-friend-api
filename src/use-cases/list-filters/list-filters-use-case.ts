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
  'low' = 'Pequena',
  'medium' = 'Média',
  'high' = 'Alta',
}

export enum IndependencyLevelEnum {
  'low' = 'Pequena',
  'medium' = 'Média',
  'high' = 'Alta',
}
export enum EnvironmentEnum {
  small = 'Pequeno',
  medium = 'Médio',
  big = 'Grande',
}

export enum PetTypeEnum {
  DOG = 'dog',
  CAT = 'cat',
}

interface ListPetTypesUseCaseResponse {
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

export class ListPetTypesUseCase {
	async execute(): Promise<ListPetTypesUseCaseResponse> {
		return {
			filters,
		}
	}
}
