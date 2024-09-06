import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData"
import prisma from "@/config/prisma"
import { config } from "@/config/baseConfig"
import { createPenerima, penerimaTransaction } from "../utils/penerima"
import { createDelivery, deliveryTransaction } from "../utils/delivery"
import { bankTransaction } from "../utils/bank"
import { createBank, createProduct, productTransaction } from "../utils/product"
import { CheckoutCreateSchema, ResponseCheckout, } from "@/interface/model/transaction.type"
import { deleteTransaction } from "@/__test__/utils/transaction";

let idUser = ""
let transactionToken = ""
let productId = 0
let deliveryId = 0
let bankId = 0
let penerimaId = 0
let transactionId = 0

const testData: ResponseCheckout = {
	productDB: expect.any(Object),
	transactionDB: expect.any(Object),
	orderanDB: expect.any(Object),
}

const dataTransaction: CheckoutCreateSchema = {
	// penerima: {
	// 	nama: "Alice Johnson",
	// 	alamat: "Jl. Merdeka No. 123, Jakarta",
	// 	hp: "081234567893"
	// },
	transaction: {
		jumlah: 123,
		penerimaDBId: 0,
		deliveryDBId: 0,
		bankDBId: 0,
		productDBId: 0,
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

it("just delete all", async () => {
	await prisma.bankDB.deleteMany()
	await prisma.productDB.deleteMany()
	await prisma.deliveryDB.deleteMany()
	await prisma.penerimaDB.deleteMany()
})

describe("can test api product", async () => {
	beforeAll(async () => {
		const { data, accessToken } = await registerTest("transaction")
		transactionToken = accessToken
		idUser = data.id
		//
		
		const productDB = await createProduct(productTransaction, accessToken)
		// productId = productDB.id
		dataTransaction.transaction.productDBId = productDB.id
		productTransaction.userId = productDB.userId
		//
		const bankDB = await createBank(bankTransaction, accessToken)
		// bankId = bankDB.id
		dataTransaction.transaction.bankDBId = bankDB.id
		bankTransaction.userId = bankDB.userId
		//
		const deliveryDB = await createDelivery(deliveryTransaction, accessToken)
		// deliveryId = deliveryDB.id
		dataTransaction.transaction.deliveryDBId = deliveryDB.id
		deliveryTransaction.userId = deliveryDB.userId
		
		//
		const penerimaDB = await createPenerima(penerimaTransaction, accessToken)
		dataTransaction.transaction.penerimaDBId = penerimaDB.id
		penerimaTransaction.userId = penerimaDB.userId
		
		// console.log(productDB)
		// console.log(transactionToken)
		console.log(dataTransaction)
		console.log(penerimaId)
		console.log(deliveryId)
		console.log(bankId)
		console.log(productId)
	})
	afterAll(async () => {
		console.log(transactionId, "transactionId---")
		console.log(transactionToken, "transactionToken---")
		//
		
		await deleteTransaction(transactionId)
		await prisma.bankDB.deleteMany()
		await prisma.productDB.deleteMany()
		await prisma.deliveryDB.deleteMany()
		await prisma.trolleyDB.deleteMany()
		await prisma.penerimaDB.deleteMany()
		await prisma.orderanDB.deleteMany()
		await deleteUserTest(transactionToken)
	})
	
	describe("POST can checkout data transaction", async () => {
		it("SUCCESS create data transaction", async () => {
			const res = await fetch(`${ config.url }/api/transactions/checkout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ transactionToken }`,
				},
				body: JSON.stringify(dataTransaction),
			})
			
			const code = res.status
			const data = await res.json()
			console.log("--- res -----")
			console.log(data)
			console.log("----res ----")
			
			transactionId = data.transactionDB.id
			expect(code).toBe(200)
			expect(data).toBeDefined()
			// const text = await res.text()
			expect(data).toStrictEqual(testData)
		})
	})
})
