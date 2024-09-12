import { describe, expect, it } from "vitest";
import { bankSchema } from "@/server/schema/bank.schema";
import { bankDataList, bankTransaction, dataExpectType } from "@/assets/example/bank";

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
		
		const testData = testFun()
		expect(testData).toStrictEqual(bankTest)
		expect(testData).toEqual(dataExpectType)
	})
	it('can validate create data bank for transaction', async () => {
		function testFun() {
			try {
				return bankSchema.createValid(bankTransaction)
			} catch (e) {
				console.log(e)
			}
		}
		
		const testData = testFun()
		expect(testData).toStrictEqual(bankTransaction)
		expect(testData).toEqual(dataExpectType)
	})
	
	it('can validate update data bank', async () => {
		function testFun() {
			try {
				return bankSchema.updateValid(bankTest)
			} catch (e) {
				console.log(e)
			}
			
		}
		
		const { userId, ...test } = dataExpectType
		const { userId: user, ...test2 } = bankTest
		const testData = testFun()
		expect(testData).toStrictEqual(test2)
		expect(testData).toEqual(test)
	})
	
})