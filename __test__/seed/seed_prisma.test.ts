import { it } from "vitest";
import prisma from "@/config/prisma";
import { BankDB, DeliveryDB } from "@prisma/client";
import { registerTest } from "@/__test__/utils/registerData";
import { productDataList } from "@/assets/example/product";
import { deliveryDataList } from "@/assets/example/delivery";
import { bankDataList } from "@/assets/example/bank";

let transactionToken = ''
let idUser = ''
it('should seed prisma', async () => {
	const { data, accessToken } = await registerTest("user4")
	transactionToken = accessToken
	idUser = data.id
	//
	// await createProduct(productTransaction, accessToken)
	const dataProductMany = productDataList.map(d => {
		return {
			qty: d.qty,
			name: d.name,
			location: d.location,
			type: d.type,
			price: d.price,
			desc: d.desc,
			// id: Number(Date.now() / d.id),
			img: d.img,
			userId: idUser,
		}
	})
	await prisma.productDB.createMany({
		data: dataProductMany
	})
	
	const dataDeliveryMany: Omit<DeliveryDB, 'id'>[] = deliveryDataList.map(d => {
		return {
			phone: d.phone,
			name: d.name,
			location: d.location,
			type: d.type,
			price: d.price,
			desc: d.desc,
			// id: Number(Date.now() / d.id),
			img: d.img,
			userId: idUser,
		}
	})
	await prisma.deliveryDB.createMany({
		data: dataDeliveryMany
	})
	
	const dataBankMany: Omit<BankDB, 'id'>[] = bankDataList.map(d => {
		return {
			phone: d.phone,
			name: d.name,
			location: d.location,
			type: d.type,
			no_req: d.no_req,
			desc: d.desc,
			img: d.img,
			userId: idUser,
		}
	})
	await prisma.bankDB.createMany({
		data: dataBankMany
	})
	
});