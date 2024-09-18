import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";
import prisma from "@/config/prisma";
import { createProduct, } from "@/__test__/utils/product";
import { productTransaction } from "@/assets/example/product";
import { expectationTrolley, sendTrolleyCreate, sendTrolleyUpdate } from "@/assets/example/trolley";
import { apiCreateTrolley, apiDeleteTrolley, apiOnIncrementTrolley } from "@/server/api/trolley.api";
import { containId } from "@/__test__/utils/auth";

let idTrolley = 0
let tokenUser = ''
let userId = ''
describe.skip('can test api trolley', async () => {
	
	beforeAll(async (ctx) => {
		const { data, accessToken } = await registerTest('trolley')
		tokenUser = accessToken
		sendTrolleyCreate.userId = data.id
		userId = data.id
		//
		const productDB = await createProduct(productTransaction, accessToken)
		sendTrolleyCreate.productId = productDB.id
		productTransaction.userId = productDB.userId
		//
	})
	afterAll(async () => {
		await prisma.productDB.deleteMany(containId(userId))
		await prisma.trolleyDB.deleteMany(containId(userId))
		await deleteUserTest(tokenUser)
	})
	
	describe('POST can create data trolley', async () => {
		
		it('SUCCESS can create  ', async () => {
			const { data, code } = await apiCreateTrolley(sendTrolleyCreate, tokenUser)
			idTrolley = data.data.id
			
			expect(code).toBe(200)
			expect(data).toMatchObject(data)
			expect(data.data).toMatchObject(expectationTrolley.data)
			// @ts-ignore
			expect(data.status).toMatchObject(expectationTrolley.status)
		});
		
		it('SUCCESS can increment ', async ({ task }) => {
			const { data, code } = await apiOnIncrementTrolley(idTrolley, sendTrolleyUpdate, tokenUser,)
			idTrolley = data.data.id
			
			expect(code).toBe(200)
			expect(data).toMatchObject(data)
			expect(data.data).toMatchObject(expectationTrolley.data)
			expect(data.data.qty).toBe(20)
			//@ts-ignore
			expect(data.status).toMatchObject(expectationTrolley.status)
		});
		
		it('SUCCESS can decrement ', async () => {
			const test = sendTrolleyUpdate
			test.qty = 100
			const { data, code } = await apiOnIncrementTrolley(idTrolley, sendTrolleyUpdate, tokenUser,)
			idTrolley = data.data.id
			
			expect(code).toBe(200)
			expect(data).toMatchObject(data)
			expect(data.data).toMatchObject(expectationTrolley.data)
			expect(data.data.qty).toBe(test.qty)
			//@ts-ignore
			expect(data.status).toMatchObject(expectationTrolley.status)
		});
		
		it('SUCCESS can remove ', async () => {
			const { data, code } = await apiDeleteTrolley(idTrolley, tokenUser)
			idTrolley = data.data.id
			
			expect(code).toBe(200)
			expect(data).toMatchObject(data)
			expect(data.data).toMatchObject(expectationTrolley.data)
			expect(data.data.qty).toBe(10)
		});
		
	})
	
})