import { describe, expect, it } from "vitest";
import { productSchema } from "@/server/schema/product.schema";
import type { ProductCreate, ProductUpdate } from "@/interface/model/product.type";

const productCreateExample: ProductCreate = {
	harga: 123,
	img: "http:image is noting",
	jenis: "Test Data",
	jumlah: 123,
	keterangan: "Is Test Data not for sell",
	lokasi: "this location not expose",
	nama: "is test product",
	userId: '12'
}

const ProductUpdate: ProductUpdate = {
	harga: 123,
	img: "http:image is noting",
	jenis: "Test Data",
	jumlah: 123,
	keterangan: "Is Test Data not for sell",
	lokasi: "this location not expose",
	nama: "is test product",
	userId: '12'
}

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
				return productSchema.updateValid(ProductUpdate)
			} catch (e) {
				console.log(e)
			}
			
		}
		
		const testData = testFun()
		console.log(testData)
		expect(testData).toStrictEqual(ProductUpdate)
		expect(testData).toEqual(ProductUpdate)
	})
	
})