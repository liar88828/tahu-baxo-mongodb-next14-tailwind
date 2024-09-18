import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import prisma from "@/config/prisma";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";
import { dataTestDelivery, dataTestDeliveryEmpty, expectationDelivery, } from "@/assets/example/delivery";
import {
	apiCreateDelivery,
	apiDeleteDelivery,
	apiGetDeliveryAll,
	apiGetDeliveryId,
	apiUpdateDelivery
} from "@/server/api/delivery.api";

let deliveryToken = ''
let deliveryId = 0
// let userId = ''

// export let deliveryFinish = false

describe('can test api delivery', async () => {
		beforeAll(async () => {
			const { data, accessToken } = await registerTest('delivery');
			deliveryToken = accessToken
			dataTestDelivery.userId = data.id
			// userId = data.id
		})
		afterAll(async () => {
			await prisma.deliveryDB.deleteMany({ where: { userId: { contains: dataTestDelivery.userId } } })
				await deleteUserTest(deliveryToken)
				
			}
		)
	
	describe('just test', () => {
		it('test function', () => {
			expect(2).toBe(2)
		})
	})
	
		describe("POST can create Data Delivery", async () => {
			
			it('ERROR Create data delivery, not have token', async () => {
				const { code, data } = await apiCreateDelivery(dataTestDelivery, 'not token')
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toBe("Invalid Compact JWS")
			})
			
			it('ERROR Create data delivery, is empty', async () => {
				// @ts-ignore
				const { code, data } = await apiCreateDelivery({}, deliveryToken)
				
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).length(6)
			})
			
			it('ERROR Create data delivery, name is empty', async () => {
				const test = structuredClone(dataTestDelivery)
				test.name = ''
				const { code, data } = await apiCreateDelivery(dataTestDelivery, deliveryToken)
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).length(1)
			})
			
			it('SUCCESS Create data delivery ', async () => {
				const { code, data } = await apiCreateDelivery(dataTestDelivery, deliveryToken)
				
				deliveryId = data.id
				expect(code).toBe(200)
				expect(data).toMatchObject(expectationDelivery)
			})
		})
		
		describe("GET can get Data Delivery", async () => {
			
			it('SUCCESS GET data delivery all delivery', async () => {
				
				const { data, code } = await apiGetDeliveryAll()
				
				expect(code).toBe(200)
				expect(data).toMatchObject({
					data: [expectationDelivery],
					"page": expect.any(Number),
					"take": expect.any(Number)
					
				})
				expect(code).not.toBe(400)
				
			})
			
			it('SUCCESS GET data delivery my id', async () => {
				const { code, data } = await apiGetDeliveryId(deliveryId)
				
				expect(code).toBe(200)
				expect(data).toMatchObject(expectationDelivery)
				expect(code).not.toBe(400)
			})
			
			it('ERROR GET data delivery. wrong id', async () => {
				// @ts-ignore
				const { code, data } = await apiGetDeliveryId('not know',)
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
		})
		
		describe("PUT can create Data Delivery", async () => {
			
			it('ERROR PUT data delivery, not have token', async () => {
				// @ts-ignore
				const { data, code } = await apiUpdateDelivery('wrong id ', dataTestDelivery, 'empry token')
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toBe("Invalid Compact JWS")
				
			})
			
			it('ERROR PUT data delivery, wrong id', async () => {
				// @ts-ignore
				const { data, code } = await apiUpdateDelivery('wrong id ', dataTestDelivery, deliveryToken)
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
			it('ERROR PUT data delivery, data is has empty object', async () => {
				// @ts-ignore
				const { data, code } = await apiUpdateDelivery(deliveryId, {}, deliveryToken)
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(code).toBe(400)
				
			})
			
			it('ERROR PUT data delivery, data is has empty value', async () => {
				
				const { data, code } = await apiUpdateDelivery(deliveryId, dataTestDeliveryEmpty, deliveryToken)
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).length(5)
			})
			
			it('ERROR PUT data delivery, name is empty', async () => {
				const test = structuredClone(dataTestDelivery)
				test.name = ''
				const { data, code } = await apiUpdateDelivery(deliveryId, test, deliveryToken)
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(test)
				expect(code).toBe(400)
				expect(data).length(1)
			})
			
			it('SUCCESS PUT data delivery use mock', async () => {
				const test = structuredClone(dataTestDelivery)
				test.name = 'name delivery is updated'
				const { data, code } = await apiUpdateDelivery(deliveryId, test, deliveryToken)
				deliveryId = data.id
				expect(code).toBe(200)
				expect(data).toMatchObject(test)
			})
		})
		
		describe("DELETE can create Data Delivery", async () => {
			
			it('ERROR delete data delivery. not have token', async () => {
				// @ts-ignore
				const { code, data } = await apiDeleteDelivery('not know', '')
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toBe('Not have token in Bearer')
			})
			
			it('ERROR delete data delivery. wrong id ', async () => {
				// @ts-ignore
				const { code, data } = await apiDeleteDelivery('not know', deliveryToken)
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
			it('SUCCESS delete data delivery.', async () => {
				const { code, data } = await apiDeleteDelivery(deliveryId, deliveryToken)
				
				expect(code).toBe(200)
				expect(data).toMatchObject(expectationDelivery)
				expect(code).not.toBe(400)
			})
			
			it('ERROR delete data delivery. data has deleted', async () => {
				const { code, data } = await apiDeleteDelivery(deliveryId, deliveryToken)
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationDelivery)
				expect(code).toBe(400)
				expect(data).toBe('Data is Not Found maybe was been delete')
				// deliveryFinish = true
			})
			
		})
})
