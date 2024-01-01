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
export type BankCreate = Prisma.Args<typeof prisma.bank, 'create'>['data']
export type ProductCreate = Prisma.Args<typeof prisma.product, 'create'>['data']
export type DeliveryCreate = Prisma.Args<typeof prisma.delivery, 'create'>['data']
export type SemuaProductCreate = Prisma.Args<typeof prisma.semuaProduct, 'create'>['data']
export type OrderanCreate = Prisma.Args<typeof prisma.orderan, 'create'>['data']

export type BankUpdate = Prisma.Args<typeof prisma.bank, 'update'>['data']
export type ProductUpdate = Prisma.Args<typeof prisma.product, 'update'>['data']
export type DeliveryUpdate = Prisma.Args<typeof prisma.delivery, 'update'>['data']
export type SemuaProductUpdate = Prisma.Args<typeof prisma.semuaProduct, 'update'>['data']
export type OrderanUpdate = Prisma.Args<typeof prisma.orderan, 'update'>['data']

export const  PrismaError= Prisma.PrismaClientKnownRequestError

export type DonatChart = ( Prisma.PickEnumerable<Prisma.SemuaProductGroupByOutputType, "nama"[]> & {} );
