import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData"
import prisma from "@/config/prisma"
import { config } from "@/config/baseConfig"
import { createPenerima, } from "../utils/penerima"
import { createDelivery, } from "../utils/delivery"

import { createBank, createProduct, } from "../utils/product"
import { deleteTransaction } from "@/__test__/utils/transaction";
import { productTransaction } from "@/assets/example/product";
import { deliveryTransaction } from "@/assets/example/delivery";
import { penerimaTransaction } from "@/assets/example/received";

import { ResponseCheckout } from "@/interface/model/checkout.type";
import { checkoutCreateExample } from "@/assets/example/checkout";
import { dataTestCreate } from "@/assets/example/bank";
import { containId } from "@/__test__/utils/auth";

let userId = ""
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

it.skip("just delete all", async () => {
	await prisma.bankDB.deleteMany(containId(userId))
	await prisma.productDB.deleteMany(containId(userId))
	await prisma.deliveryDB.deleteMany(containId(userId))
	await prisma.receiverDB.deleteMany(containId(userId))
})

describe.skip("can test api transaction", async () => {
	beforeAll(async () => {
		const { data, accessToken } = await registerTest("transaction")
		transactionToken = accessToken
		userId = data.id
		//
		
		const productDB = await createProduct(productTransaction, accessToken)
		// productId = productDB.id
		checkoutCreateExample.transaction.productDBId = productDB.id
		productTransaction.userId = productDB.userId
		//
		const bankDB = await createBank(dataTestCreate, accessToken)
		// bankId = bankDB.id
		checkoutCreateExample.transaction.bankDBId = bankDB.id
		dataTestCreate.userId = bankDB.userId
		//
		const deliveryDB = await createDelivery(deliveryTransaction, accessToken)
		// deliveryId = deliveryDB.id
		checkoutCreateExample.transaction.deliveryDBId = deliveryDB.id
		deliveryTransaction.userId = deliveryDB.userId
		
		//
		const penerimaDB = await createPenerima(penerimaTransaction, accessToken)
		checkoutCreateExample.transaction.receiverDBId = penerimaDB.id
		penerimaTransaction.userId = penerimaDB.userId
		
		// console.log(productDB)
		// console.log(transactionToken)
		console.log(checkoutCreateExample)
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
		await prisma.bankDB.deleteMany(containId(userId))
		await prisma.productDB.deleteMany(containId(userId))
		await prisma.deliveryDB.deleteMany(containId(userId))
		await prisma.trolleyDB.deleteMany(containId(userId))
		await prisma.receiverDB.deleteMany(containId(userId))
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
				body: JSON.stringify(checkoutCreateExample),
			})
			console.log(checkoutCreateExample, 'test')
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
