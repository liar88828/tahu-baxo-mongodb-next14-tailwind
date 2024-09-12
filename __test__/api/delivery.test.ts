import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import prisma from "@/config/prisma";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";
import { RegisterUser } from "@/interface/model/auth.type";
import { dataTestDelivery, dataTestDeliveryEmpty, expectationDelivery, } from "@/assets/example/delivery";

let deliveryToken = ''
let deliveryId = 0

export let deliveryFinish = false

describe
	//.skipIf(bankFinish === true)
	('can test api delivery', async () => {
		beforeAll(async () => {
			const { data, accessToken } = await registerTest('delivery');
			deliveryToken = accessToken
			dataTestDelivery.userId = data.id
		})
		afterAll(async () => {
				await prisma.deliveryDB.deleteMany()
				await deleteUserTest(deliveryToken)
				
			}
		)
		
		describe("POST can create Data Delivery", async () => {
			
			it('ERROR Create data delivery, not have token', async () => {
				
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ 'empty token' }`
					},
					body: JSON.stringify(dataTestDelivery),
				})
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toBe("Invalid Compact JWS")
				
			})
			
			it('ERROR Create data delivery, is empty', async () => {
				
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify({}),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).length(6)
			})
			
			it('ERROR Create data delivery, name is empty', async () => {
				const test = structuredClone(dataTestDelivery)
				test.name = ''
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(test),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).length(1)
			})
			
			it('SUCCESS Create data delivery ', async () => {
				
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(dataTestDelivery),
				})
				const code = res.status
				const data = await res.json()
				deliveryId = data.id
				expect(code).toBe(200)
				expect(data).toMatchObject(expectationDelivery)
			})
		})
		
		describe("GET can get Data Delivery", async () => {
			
			it('SUCCESS GET data delivery all delivery', async () => {
				
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).toBe(200)
				expect(data).toMatchObject({
					data: [expectationDelivery],
					"page": expect.any(Number),
					"take": expect.any(Number)
					
				})
				expect(code).not.toBe(400)
				
			})
			
			it('SUCCESS GET data delivery my id', async () => {
				

				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).toBe(200)
				expect(data).toMatchObject(expectationDelivery)
				expect(code).not.toBe(400)
			})
			
			it('SUCCESS GET data delivery. wrong id', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'not know' }`, {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
		})
		
		describe("PUT can create Data Delivery", async () => {
			
			it('ERROR PUT data delivery, not have token', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'woring id' }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ 'empty token' }`
					},
					body: JSON.stringify(dataTestDelivery),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toBe("Invalid Compact JWS")
				
			})
			
			it('ERROR PUT data delivery, wrong id', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'woring id' }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(dataTestDelivery),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
			it('ERROR PUT data delivery, data is has empty object', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify({}),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(code).toBe(400)
				
			})
			
			it('ERROR PUT data delivery, data is has empty value', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(dataTestDeliveryEmpty),
				})
				const code = res.status
				const data = await res.json()
				console.log(data)
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).length(5)
			})
			
			it('ERROR PUT data delivery, name is empty', async () => {
				const test = structuredClone(dataTestDelivery)
				test.name = ''
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(test),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(test)
				
				expect(code).toBe(400)
				expect(data).length(1)
			})
			
			it('SUCCESS PUT data delivery use mock', async () => {
				const test = structuredClone(dataTestDelivery)
				test.name = 'name delivery is updated'
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(test),
				})
				const code = res.status
				const data = await res.json()
				deliveryId = data.id
				expect(code).toBe(200)
				expect(data).toMatchObject(test)
			})
		})
		
		describe("DELETE can create Data Delivery", async () => {
			
			it('ERROR delete data delivery. not have token', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'not know' }`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				console.log(data)
				expect(code).toBe(400)
				expect(data).toBe('Not have token in Bearer')
			})
			
			it('ERROR delete data delivery. wrong id ', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'not know' }`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
			it('SUCCESS delete data delivery.', async () => {
				
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).toBe(200)
				expect(data).toMatchObject(expectationDelivery)
				expect(code).not.toBe(400)
			})
			
			it('ERROR delete data delivery. data has deleted', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				console.log(data)
				expect(code).toBe(400)
				expect(data).toBe('Data is Not Found maybe was been delete')
				deliveryFinish = true
			})
			
		})
})
