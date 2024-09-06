import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { TrolleyUpdate } from "@/interface/model/trolley.type";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";
import prisma from "@/config/prisma";
import { createProduct, productTransaction } from "@/__test__/utils/product";
import { ResponseTrolley } from "@/server/service/trolley.service";
import { sendTrolleyCreate } from "@/__test__/schema/trolley.test";

const sendTrolley: TrolleyUpdate = {
	id: 3,
	qty: 12,
	productId: 13,
	userId: ''
}

let idTrolley: TrolleyUpdate["id"] = 0

const testTrolleyExpect: ResponseTrolley = {
	data: {
		id: expect.any(Number),
		qty: expect.any(Number),
		productId: expect.any(Number),
		userId: expect.any(String),
	},
	status: expect.any(String)
}
let tokenUser = ''
describe('can test api trolley', async () => {
	
	beforeAll(async (ctx) => {
		const { data, accessToken } = await registerTest('trolley')
		tokenUser = accessToken
		sendTrolleyCreate.userId = data.id
		//
		const productDB = await createProduct(productTransaction, accessToken)
		sendTrolleyCreate.productId = productDB.id
		productTransaction.userId = productDB.userId
		//
	})
	afterAll(async () => {
		await prisma.productDB.deleteMany()
		await prisma.trolleyDB.deleteMany()
		await deleteUserTest(tokenUser)
	})
	
	describe('POST can create data trolley', async () => {
		
		it('SUCCESS can create  ', async () => {
			const res = await fetch("http://localhost:3000/api/trolley", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ tokenUser }`,
				},
				body: JSON.stringify(sendTrolleyCreate),
			})
			
			const code = res.status
			const data: ResponseTrolley = await res.json()
			idTrolley = data.data.id
			expect(code).toBe(200)
			expect(data).toMatchObject(data)
			expect(data.data).toMatchObject(testTrolleyExpect.data)
			// @ts-ignore
			expect(data.status).toMatchObject(testTrolleyExpect.status)
		});
		
		it('SUCCESS can increment ', async ({ task }) => {
			const res = await fetch(`http://localhost:3000/api/trolley/${ idTrolley }`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ tokenUser }`,
				},
				body: JSON.stringify(sendTrolleyCreate),
			})
			
			const code = res.status
			const data: ResponseTrolley = await res.json()
			
			idTrolley = data.data.id
			expect(code).toBe(200)
			expect(data).toMatchObject(data)
			expect(data.data).toMatchObject(testTrolleyExpect.data)
			expect(data.data.qty).toBe(20)
			//@ts-ignore
			expect(data.status).toMatchObject(testTrolleyExpect.status)
		});
		
		it('SUCCESS can decrement ', async () => {
			const res = await fetch(`http://localhost:3000/api/trolley/${ idTrolley }`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ tokenUser }`,
				},
				body: JSON.stringify(sendTrolleyCreate),
			})
			
			const code = res.status
			const data = await res.json()
			
			idTrolley = data.data.id
			expect(code).toBe(200)
			expect(data).toMatchObject(data)
			expect(data.data).toMatchObject(testTrolleyExpect.data)
			expect(data.data.qty).toBe(10)
			//@ts-ignore
			expect(data.status).toMatchObject(testTrolleyExpect.status)
		});
		
		it('SUCCESS can remove ', async () => {
			const res = await fetch(`http://localhost:3000/api/trolley/${ idTrolley }`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ tokenUser }`,
				},
				body: JSON.stringify(sendTrolleyCreate),
			})
			
			const code = res.status
			const data: ResponseTrolley = await res.json()
			
			idTrolley = data.data.id
			expect(code).toBe(200)
			expect(data).toMatchObject(data)
			expect(data.data).toMatchObject(testTrolleyExpect.data)
			expect(data.data.qty).toBe(10)
		});
		
	})
	
})