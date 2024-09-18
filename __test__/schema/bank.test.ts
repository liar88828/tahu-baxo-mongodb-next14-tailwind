import { describe, expect, it } from "vitest";
import { bankSchema } from "@/server/schema/bank.schema";
import { bankDataList, dataExpectTypeDB, dataTestCreate, } from "@/assets/example/bank";

const bankTest = bankDataList[0]
describe('test zod schema bank', () => {
	
	it('can validate create data bank', async () => {
		function testFun() {
			try {
				return bankSchema.createValid(bankTest)
			} catch (e) {
				console.log(e)
			}
		}
		
		const { updated_at, created_at, ...test } = dataExpectTypeDB
		const testData = testFun()
		expect(testData).toStrictEqual(bankTest)
		expect(testData).toEqual(test)
	})
	
	it('can validate create data bank for transaction', async () => {
		function testFun() {
			try {
				return bankSchema.createValid(dataTestCreate)
			} catch (e) {
				console.log(e)
			}
		}
		
		const { id, updated_at, created_at, ...test } = dataExpectTypeDB
		const testData = testFun()
		expect(testData).toStrictEqual(dataTestCreate)
		expect(testData).toEqual(test)
	})
	
	it('can validate update data bank', async () => {
		function testFun() {
			try {
				return bankSchema.updateValid(bankTest)
			} catch (e) {
				console.log(e)
			}
			
		}
		
		const { userId, updated_at, created_at, ...test } = dataExpectTypeDB
		const { userId: user, ...test2 } = bankTest
		const testData = testFun()
		expect(testData).toStrictEqual(test2)
		expect(testData).toEqual(test)
	})
	
})