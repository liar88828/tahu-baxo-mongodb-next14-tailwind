import { describe, expect, it } from "vitest";
import { bankService } from "@/server/service/bank.service";

describe('test bank service', async () => {
	it('can validate find one ', async () => {
		function funTest() {
			return () => bankService.findOne(1);
		}
		
		const testData = () => bankService.findOne(1);
		
		expect(() => bankService.findOne(1)).toThrowError(/^Method not implemented.$/)
		expect(() => bankService.findOne(1)).toThrowError('Method not implemented')
		expect(funTest()).toThrowError('Method not implemented')
		expect(testData).toThrowError('Method not implemented')
	})
})
