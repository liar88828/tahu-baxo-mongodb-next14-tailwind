import prisma from "@/config/prisma";
export const getUserIdPrisma = async () => await prisma.user.findFirst()
export const getTrolleyPrisma = async () => {
  return prisma.trolleyDB.findFirst()
}
export const getTrolley = async () => await prisma.trolleyDB.findFirst()
