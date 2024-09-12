import { describe, expect, it } from "vitest"
import { trolleySchema } from "@/server/schema/trolley.schema";
import { z } from "zod";
import { sendTrolleyCreate, sendTrolleyUpdate } from "@/assets/example/trolley";

describe('can test trolley schema', async () => {
	
	describe("test zod schema", () => {
		
		it("can validate create data", async () => {
			async function testFun() {
				try {
					return trolleySchema.validCreate(sendTrolleyCreate)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(sendTrolleyCreate)
			expect(testData).toEqual(sendTrolleyCreate)
		})
		
		it("can validate create data qty = 0", async () => {
			const copyTestData = structuredClone(sendTrolleyCreate)
			copyTestData.qty = 0
			
			async function testFun() {
				try {
					return trolleySchema.validCreate(copyTestData)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(copyTestData)
			expect(testData).toEqual(copyTestData)
		})
		
		it("can validate create data qty = -1", async () => {
			const copyTestData = structuredClone(sendTrolleyCreate)
			copyTestData.qty = -1
			
			async function testFun() {
				try {
					return trolleySchema.validCreate(copyTestData)
				} catch (e) {
					if (e instanceof z.ZodError) {
						return e.flatten()
					}
				}
			}
			
			const testData = await testFun()
			expect(testData).not.toStrictEqual(copyTestData)
			expect(testData).not.toEqual(copyTestData)
			expect(testData).toMatchObject(expect.any(Object))
		})
		
		it("can validate update data", async () => {
			async function testFun() {
				try {
					return trolleySchema.validUpdate(sendTrolleyUpdate)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(sendTrolleyUpdate)
			expect(testData).toEqual(sendTrolleyUpdate)
		})
	})
	
	describe("test zod schema update Many", () => {
		it("can validate create data many id product", async () => {
			async function testFun() {
				try {
					return trolleySchema.validUpdate(sendTrolleyUpdate)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(sendTrolleyUpdate)
			expect(testData).toEqual(sendTrolleyUpdate)
		})
	})
	
})
