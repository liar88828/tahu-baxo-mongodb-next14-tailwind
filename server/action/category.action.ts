'use server'
import prisma from "@/config/prisma";

export async function getAllCategory(take?: number) {
	
	return prisma.categoryProductDB.findMany({ ...(take ? { take } : {}) })
}