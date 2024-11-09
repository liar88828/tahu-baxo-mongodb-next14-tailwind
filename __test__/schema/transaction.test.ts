import { describe, expect, it } from "vitest"
import { transactionCreateExample, transactionCreateManyExample } from "@/assets/example/transaction";
import { transactionSchema } from "@/server/schema/transaction.schema";

describe('can test transaction schema', async () => {
	
	describe("test zod schema", () => {
		it("Success can validate create data", async () => {
			async function testFun() {
				try {
					return transactionSchema.orderValid(transactionCreateExample)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(transactionCreateExample)
			expect(testData).toEqual(transactionCreateExample)
		})
	})
	
	describe("test zod schema Many", () => {
		it("can validate create data many id product", async () => {
			async function testFun() {
				try {
					return transactionSchema.orderValidMany(transactionCreateManyExample)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(transactionCreateManyExample)
			expect(testData).toEqual(transactionCreateManyExample)
		})
	})
	
	describe("test zod id product form transaction", () => {
		it("can validate create data many id product", async () => {
			async function testFun() {
				try {
					return transactionSchema.idProduct(transactionCreateExample['productDBId'])
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(transactionCreateExample['productDBId'])
			expect(testData).toEqual(transactionCreateExample['productDBId'])
		})
	})
	
})
