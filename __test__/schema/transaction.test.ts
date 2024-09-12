import { describe, expect, it } from "vitest"
import { checkoutSchema } from "@/server/schema/checkout.schema";
import { transactionCreateExample, transactionCreateManyExample } from "@/assets/example/transaction";

describe('can test transaction schema', async () => {
	
	describe("test zod schema", () => {
		it("can validate create data", async () => {
			async function testFun() {
				try {
					return checkoutSchema.checkoutValid(transactionCreateExample)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			console.log(testData)
			expect(testData).toStrictEqual(transactionCreateExample)
			expect(testData).toEqual(transactionCreateExample)
		})
	})
	
	describe("test zod schema Many", () => {
		it("can validate create data many id product", async () => {
			async function testFun() {
				try {
					return checkoutSchema.checkoutValidMany(transactionCreateManyExample)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			console.log(testData)
			expect(testData).toStrictEqual(transactionCreateManyExample)
			expect(testData).toEqual(transactionCreateManyExample)
		})
	})
})
