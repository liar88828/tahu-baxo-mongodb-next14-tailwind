import { describe, expect, it } from "vitest"
import { CheckoutCreateMany, CheckoutCreateSchema } from "@/interface/model/transaction.type"
import { checkoutSchema } from "@/server/schema/checkout.schema";

const transactionCreateExample: CheckoutCreateSchema = {
	transaction: {
		jumlah: 123,
		penerimaDBId: 123,
		deliveryDBId: 123,
		bankDBId: 123,
		productDBId: 123
	},
	order: {
		dari: "John Doe",
		pengirim: "Doe Delivery",
		nama: "Jane Smith",
		hp: "081234567890",
		guna: "Personal Use",
		lokasi: "Jakarta",
		ongkir: 15000,
		status: "Shipped",
	},
}
const transactionCreateManyExample: CheckoutCreateMany = {
	transaction: {
		jumlah: 123,
		penerimaDBId: 123,
		deliveryDBId: 123,
		bankDBId: 123,
	},
	order: {
		dari: "John Doe",
		pengirim: "Doe Delivery",
		nama: "Jane Smith",
		hp: "081234567890",
		guna: "Personal Use",
		lokasi: "Jakarta",
		ongkir: 15000,
		status: "Shipped",
	},
	trollyIds: [
		{ id: 12 },
		{ id: 432 }
	]
}
describe('can test transaction schema', async () => {
	
	describe("test zod schema", () => {
		it("can validate create data", async () => {
			async function testFun() {
				try {
					return checkoutSchema.checkoutValid(transactionCreateExample)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			console.log(testData)
			expect(testData).toStrictEqual(transactionCreateExample)
			expect(testData).toEqual(transactionCreateExample)
		})
	})
	
	describe("test zod schema Many", () => {
		it("can validate create data many id product", async () => {
			async function testFun() {
				try {
					return checkoutSchema.checkoutValidMany(transactionCreateManyExample)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			console.log(testData)
			expect(testData).toStrictEqual(transactionCreateManyExample)
			expect(testData).toEqual(transactionCreateManyExample)
		})
	})
})
