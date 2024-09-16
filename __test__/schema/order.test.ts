import { describe, expect, it } from "vitest"
import { orderSchema } from "@/server/schema/order.schema";
import { orderTestCreate } from "@/assets/example/order";

describe('can test order schema', async () => {
	describe("test zod schema", () => {
		it("can validate create data", async () => {
			async function testFun() {
				try {
					return orderSchema.validCreate(orderTestCreate)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(orderTestCreate)
			expect(testData).toEqual(orderTestCreate)
		})
	})
	
})
