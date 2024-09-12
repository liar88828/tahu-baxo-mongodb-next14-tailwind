import { TrolleyCreate, TrolleyResponse, TrolleyUpdate } from "@/interface/model/trolley.type";
import { expect } from "vitest";

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

export const expectationTrolley: TrolleyResponse = {
	data: {
		id: expect.any(Number),
		qty: expect.any(Number),
		productId: expect.any(Number),
		userId: expect.any(String),
	},
	status: expect.any(String)
}
