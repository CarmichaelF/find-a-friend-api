import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'
import { RegisterPetUseCase } from '../register-pet/register-pet-use-case'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeRegisterPetUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const orgsRepository = new PrismaOrgsRepository()
	const addressRepository = new PrismaAddressRepository()
	const useCase = new RegisterPetUseCase(petsRepository, orgsRepository, addressRepository)

	return useCase
}
