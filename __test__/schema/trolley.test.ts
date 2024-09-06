import { describe, expect, it } from "vitest"
import { TrolleyCreate } from "@/interface/model/trolley.type"
import { trolleySchema } from "@/server/schema/trolley.schema";

const sendTrolley: TrolleyCreate = {
	id: 3,
	qty: 12,
	productId: 13,
	userId: 'asdasd'
}

describe('can test trolley schema', async () => {
	
	describe("test zod schema", () => {
		it("can validate create data", async () => {
			async function testFun() {
				try {
					return trolleySchema.validCreate(sendTrolley)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			console.log(testData)
			expect(testData).toStrictEqual(sendTrolley)
			expect(testData).toEqual(sendTrolley)
		})
	})
	
	describe("test zod schema Many", () => {
		it("can validate create data many id product", async () => {
			async function testFun() {
				try {
					return trolleySchema.validCreate(sendTrolley)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			console.log(testData)
			expect(testData).toStrictEqual(sendTrolley)
			expect(testData).toEqual(sendTrolley)
		})
	})
})
