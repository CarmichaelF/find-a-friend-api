import { Address, Prisma } from '@prisma/client'

export interface AddressRepository{
    create(data: Prisma.AddressCreateInput) : Promise<Address>
    getAddressById(id: string) : Promise<Address | null>
}