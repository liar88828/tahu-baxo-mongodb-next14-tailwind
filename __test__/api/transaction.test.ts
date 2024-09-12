import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData"
import prisma from "@/config/prisma"
import { config } from "@/config/baseConfig"
import { createPenerima, } from "../utils/penerima"
import { createDelivery, } from "../utils/delivery"

import { createBank, createProduct, } from "../utils/product"
import { ResponseCheckout, } from "@/interface/model/transaction.type"
import { deleteTransaction } from "@/__test__/utils/transaction";
import { transactionCreateExample } from "@/assets/example/transaction";
import { productTransaction } from "@/assets/example/product";
import { deliveryTransaction } from "@/assets/example/delivery";
import { penerimaTransaction } from "@/assets/example/received";
import { bankTransaction } from "@/assets/example/bank";

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


it("just delete all", async () => {
	await prisma.bankDB.deleteMany()
	await prisma.productDB.deleteMany()
	await prisma.deliveryDB.deleteMany()
	await prisma.receiverDB.deleteMany()
})

describe("can test api transaction", async () => {
	beforeAll(async () => {
		const { data, accessToken } = await registerTest("transaction")
		transactionToken = accessToken
		idUser = data.id
		//
		
		const productDB = await createProduct(productTransaction, accessToken)
		// productId = productDB.id
		transactionCreateExample.transaction.productDBId = productDB.id
		productTransaction.userId = productDB.userId
		//
		const bankDB = await createBank(bankTransaction, accessToken)
		// bankId = bankDB.id
		transactionCreateExample.transaction.bankDBId = bankDB.id
		bankTransaction.userId = bankDB.userId
		//
		const deliveryDB = await createDelivery(deliveryTransaction, accessToken)
		// deliveryId = deliveryDB.id
		transactionCreateExample.transaction.deliveryDBId = deliveryDB.id
		deliveryTransaction.userId = deliveryDB.userId
		
		//
		const penerimaDB = await createPenerima(penerimaTransaction, accessToken)
		transactionCreateExample.transaction.receiverDBId = penerimaDB.id
		penerimaTransaction.userId = penerimaDB.userId
		
		// console.log(productDB)
		// console.log(transactionToken)
		console.log(transactionCreateExample)
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
		await prisma.receiverDB.deleteMany()
		await prisma.orderanDB.deleteMany()
		await deleteUserTest(transactionToken)
	})
	
	describe.skip("POST can checkout data transaction", async () => {
		it("SUCCESS create data transaction", async () => {
			const res = await fetch(`${ config.url }/api/transactions/checkout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ transactionToken }`,
				},
				body: JSON.stringify(transactionCreateExample),
			})
			console.log(transactionCreateExample, 'test')
			const code = res.status
			const data = await res.json()
			console.log("--- res -----")
			console.log(data)
			console.log("----res ----")
			
			transactionId = data.transactionDB.id
			expect(code).toBe(200)
			expect(data).toBeDefined()
			
			expect(data).toStrictEqual(testData)
		})
	})
})
