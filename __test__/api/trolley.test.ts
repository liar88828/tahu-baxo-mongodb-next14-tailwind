import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { TrolleyCreate } from "@/interface/model/trolley.type";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";
import prisma from "@/config/prisma";
import { createProduct, productTransaction } from "@/__test__/utils/product";
import { ResponseTrolley } from "@/server/service/trolley.service";

const sendTrolley: TrolleyCreate = {
	id: 3,
	qty: 12,
	productId: 13,
	userId: ''
}

const testTrolleyExpect: ResponseTrolley = {
	data: {
		id: expect.any(Number),
		qty: expect.any(Number),
		productId: expect.any(Number),
		userId: expect.any(String),
	},
	status: expect.any
	(String)
}
let tokenUser = ''
describe('can test api trolley', async () => {
	
	beforeAll(async () => {
		const { data, accessToken } = await registerTest('product')
		tokenUser = accessToken
		sendTrolley.userId = data.id
		//
		const productDB = await createProduct(productTransaction, accessToken)
		sendTrolley.productId = productDB.id
		productTransaction.userId = productDB.userId
		//
		
	})
	afterAll(async () => {
		await prisma.productDB.deleteMany()
		await prisma.trolleyDB.deleteMany()
		await deleteUserTest(tokenUser)
	})
	
	describe('POST can create data trolley', async () => {
		it('SUCCESS ', async () => {
			
			const res = await fetch("http://localhost:3000/api/trolley/1", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ tokenUser }`,
				},
				body: JSON.stringify(sendTrolley),
			})
			
			const code = res.status
			const data = await res.json()
			
			expect(code).toBe(200)
			expect(data).toMatchObject(testTrolleyExpect)
			
		});
	})
	
})