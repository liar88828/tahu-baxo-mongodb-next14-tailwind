import { describe, expect, it } from "vitest";
import { ProductCreate, productSchema } from "@/server/schema/product.schema";

const dataTestProduct: ProductCreate = {
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
	it('can validate create data', async () => {
		function testFun() {
			try {
				return productSchema.createValid(dataTestProduct)
			} catch (e) {
				console.log(e)
			}
		}
		
		const testData = testFun()
		console.log(testData)
		expect(testData).toStrictEqual(dataTestProduct)
		expect(testData).toEqual(dataTestProduct)
	})
})