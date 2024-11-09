import { describe, expect, it } from "vitest";
import { productSchema } from "@/server/schema/product.schema";
import { productCreateExample, productUpdate } from "@/assets/example/product";

describe('test zod schema product', () => {
	it('can validate create data product', async () => {
		function testFun() {
			try {
				return productSchema.createValid(productCreateExample)
			} catch (e) {
				console.log(e)
			}
		}
		
		const testData = testFun()
		console.log(testData)
		expect(testData).toStrictEqual(productCreateExample)
		expect(testData).toEqual(productCreateExample)
	})
	
	it('can validate update data product', async () => {
		function testFun() {
			try {
				return productSchema.updateValid(productUpdate)
			} catch (e) {
				console.log(e)
			}
			
		}
		
		const testData = testFun()
		console.log(testData)
		expect(testData).toStrictEqual(productUpdate)
		expect(testData).toEqual(productUpdate)
	})
	
})