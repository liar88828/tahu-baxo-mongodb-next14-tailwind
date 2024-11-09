import { TrolleyCreate, TrolleyResponse, TrolleyUpdate } from "@/interface/model/trolley.type";
import { expect } from "vitest";
import { TrolleyDB } from "@prisma/client";

export const sendTrolleyCreate: TrolleyCreate = {
	qty: 10,
	productId: 10,
	userId: 'user'
}

export const sendTrolleyUpdate: TrolleyUpdate = {
	id: 1,
	qty: 10,
	productId: 10,
	userId: 'user'
}
export const exampleTrolley: TrolleyDB = {
	id: 1,
	qty: 10,
	productId: 10,
	userId: 'user',
	transactionId: 123,
	isBuy: true
}

export const expectationTrolley: TrolleyResponse = {
	data: {
		id: expect.any(Number),
		qty: expect.any(Number),
		productId: expect.any(Number),
		userId: expect.any(String),
		isBuy: expect.any(Boolean),
	},
	status: expect.any(String)
}
