import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";
import prisma from "@/config/prisma";
import { config } from "@/config/baseConfig";
import {
	bankTransaction,
	createBank,
	createDelivery,
	createPenerima,
	createProduct,
	deleteTransaction,
	deliveryTransaction,
	penerimaTransaction,
	productTransaction,
	registerUserTransaction
} from "@/__test__/utils/transaction";
import { ResponseTransaction, TransactionCreate } from "@/interface/transaction";

let transactionToken = ''
let productId = 0
let deliveryId = 0
let bankId = 0
let penerimaId = 0
let transactionId = 0

describe('can test api product', async () => {
	beforeAll(async () => {
		const { data, accessToken } = await registerTest(registerUserTransaction);
		transactionToken = accessToken
		console.log(transactionToken)
		//
		
		const productDB = await createProduct(productTransaction, accessToken)
		productId = productDB.id
		productTransaction.userId = productDB.userId
		//
		const bankDB = await createBank(bankTransaction, accessToken)
		bankId = bankDB.id
		bankTransaction.userId = bankDB.userId
		//
		const deliveryDB = await createDelivery(deliveryTransaction, accessToken)
		deliveryId = deliveryDB.id
		deliveryTransaction.userId = deliveryDB.userId
		
		//
		const penerimaDB = await createPenerima(penerimaTransaction, accessToken)
		penerimaId = penerimaDB.id
		
	})
	afterAll(async () => {
		
		console.log(transactionId, 'transactionId---')
		console.log(transactionToken, 'transactionToken---')
		//
		
		await deleteTransaction(transactionId)
		await prisma.bankDB.deleteMany()
		await prisma.productDB.deleteMany()
		await prisma.deliveryDB.deleteMany()
		await prisma.penerimaDB.deleteMany()
		await prisma.orderanDB.deleteMany()
		await deleteUserTest(transactionToken)
		await prisma.trolley.deleteMany()
		
	})
	describe('POST can checkout data transaction', async () => {
		it('SUCCESS create data transaction', async () => {
			
			const dataTransaction: TransactionCreate = {
				// penerima: {
				// 	nama: "Alice Johnson",
				// 	alamat: "Jl. Merdeka No. 123, Jakarta",
				// 	hp: "081234567893"
				// },
				transaction: {
					jumlah: 123,
					productDBId: productId,
					penerimaDBId: penerimaId,
					deliveryDBId: deliveryId,
					bankDBId: bankId,
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
			
			const res = await fetch(`${ config.url }/api/transactions/checkout`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ transactionToken }`
				},
				body: JSON.stringify(dataTransaction),
			})
			
			const code = res.status
			const data = await res.json()
			console.log('--- res -----')
			console.log(data)
			console.log('----res ----')
			expect(code).toBe(200)
			transactionId = data.transactionDB.id
			expect(data).toBeDefined()
			
			// const text = await res.text()
			
			const testData: ResponseTransaction = {
				productDB: expect.any(Object),
				transactionDB: expect.any(Object),
				orderanDB: expect.any(Object),
			}
			expect(data).toStrictEqual(testData)
		})
	})
})


