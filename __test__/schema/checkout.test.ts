import { describe, expect, it } from "vitest"
import { checkoutSchema } from "@/server/schema/checkout.schema";
import { checkoutCreateExample, checkoutCreateManyExample } from "@/assets/example/checkout";

describe('can test checkout schema', async () => {
	describe("test zod schema", () => {
		it("can validate create data", async () => {
			async function testFun() {
				try {
					return checkoutSchema.checkoutValid(checkoutCreateExample)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(checkoutCreateExample)
			expect(testData).toEqual(checkoutCreateExample)
		})
	})
	
	describe("test zod schema Many", () => {
		it("can validate create data many id product", async () => {
			async function testFun() {
				try {
					return checkoutSchema.checkoutValidMany(checkoutCreateManyExample)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(checkoutCreateManyExample)
			expect(testData).toEqual(checkoutCreateManyExample)
		})
	})
})
