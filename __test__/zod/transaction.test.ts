import { describe, expect, it } from "vitest";
import { TransactionCreate } from "@/interface/transaction";
import { transactionSchema } from "@/server/schema/transaction.schema";

const dataTransaction: TransactionCreate = {
	transaction: {
		jumlah: 123,
		productDBId: 123,
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
	}
}

describe('test zod schema', () => {
	it('can validate create data', async () => {
		function testFun() {
			try {
				return transactionSchema.transactionValid(dataTransaction)
			} catch (e) {
				console.log(e)
			}
		}
		
		const testData = testFun()
		console.log(testData)
		expect(testData).toStrictEqual(dataTransaction)
		expect(testData).toEqual(dataTransaction)
	})
})