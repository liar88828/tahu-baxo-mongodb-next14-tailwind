import { Prisma, PrismaClient } from '@prisma/client'
const prismaClientSingleton = () => {
 return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
 prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if( process.env.NODE_ENV !== 'production' ) globalForPrisma.prisma = prisma

// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }
//
// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }
//
// const prisma = globalThis.prisma ?? prismaClientSingleton()
//
// export default prisma
//
// if( process.env.NODE_ENV !== 'production' ) globalThis.prisma = prisma

 // const prisma = new PrismaClient()

// export default prisma
export type BankCreate = Prisma.Args<typeof prisma.bankDB, 'create'>['data']
export type ProductCreate = Prisma.Args<typeof prisma.productDB, 'create'>['data']
export type DeliveryCreate = Prisma.Args<typeof prisma.deliveryDB, 'create'>['data']
export type OrderanCreate = Prisma.Args<typeof prisma.orderanDB, 'create'>['data']

export type BankUpdate = Prisma.Args<typeof prisma.bankDB, 'update'>['data']
export type ProductUpdate = Prisma.Args<typeof prisma.productDB, 'update'>['data']
export type DeliveryUpdate = Prisma.Args<typeof prisma.deliveryDB, 'update'>['data']
export type OrderanUpdate = Prisma.Args<typeof prisma.orderanDB, 'update'>['data']

export const  PrismaError= Prisma.PrismaClientKnownRequestError

