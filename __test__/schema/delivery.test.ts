import { describe, expect, it } from "vitest";
import { deliverySchema } from "@/server/schema/deliver.schema";
import { dataTestDelivery, expectationDelivery } from "@/assets/example/delivery";

describe('test zod schema delivery', () => {
	it('can validate create data delivery', async () => {
		function testFun() {
			try {
				return deliverySchema.createValid(dataTestDelivery)
			} catch (e) {
				console.log(e)
			}
		}
		
		const { id, ...test } = expectationDelivery
		const testData = testFun()
		expect(testData).toStrictEqual(dataTestDelivery)
		expect(testData).toEqual(test)
	})
	
	it('can validate update data delivery', async () => {
		function testFun() {
			try {
				return deliverySchema.updateValid(dataTestDelivery)
			} catch (e) {
				console.log(e)
			}
			
		}
		
		const { id, userId: user, ...test } = expectationDelivery
		const { userId, ...test2 } = dataTestDelivery
		const testData = testFun()
		expect(testData).toStrictEqual(test2)
		expect(testData).toEqual(test)
	})
	
})