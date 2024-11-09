import { test } from "vitest";
import { newCategory } from "@/assets/category";
import prisma from "@/config/prisma";

test.skip('seed category', async (t) => {
	const data = newCategory.map(t => {
		return {
			id: t.title
		}
	})
	
	const res = await prisma.categoryProductDB.createMany(
		{
			data: data
		}
	)
	console.log(res)
	
})