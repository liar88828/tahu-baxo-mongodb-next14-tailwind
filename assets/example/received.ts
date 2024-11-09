import { PenerimaTransaction } from "@/__test__/utils/penerima";
import { ReceiverDB } from "@prisma/client";
import { expect } from "vitest";

export const penerimaTransaction: PenerimaTransaction = {
	name: "Alice Johnson",
	address: "Jl. Merdeka No. 123, Jakarta",
	phone: "081234567893",
	userId: "cm0ray6cb0001rsx0eaaiat90",
}

export const testPenerimaEmpty: Omit<ReceiverDB, "id"> = {
	name: "",
	address: "",
	phone: "",
	userId: "cm0ray6cb0001rsx0eaaiat90",
}

export const testExpectPenerima: ReceiverDB = {
	name: expect.any(String),
	address: expect.any(String),
	phone: expect.any(String),
	id: expect.any(Number),
	userId: expect.any(String),
}