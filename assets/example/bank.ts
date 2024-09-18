import { BankDB } from "@prisma/client";
import { expect } from "vitest";
import { BankCreate, BankCreatePrisma, BankUpdate } from "@/interface/model/bank.type";

export const dataExpectTypeDB: BankDB = {
	phone: expect.any(String),
	id: expect.any(Number),
	img: expect.any(String),
	type: expect.any(String),
	desc: expect.any(String),
	location: expect.any(String),
	name: expect.any(String),
	no_req: expect.any(String),
	userId: expect.any(String),
	created_at: expect.any(Date),
	updated_at: expect.any(Date)
}

export const dataTestBankEmpty: BankCreatePrisma = {
	desc: "",
	img: "",
	location: "",
	name: "",
	no_req: "0",
	phone: "0",
	type: "",
	userId: ''
}

export const dataTestCreate: BankCreate = {
	phone: "(024) 1233 12343 ",
	img: "not have image",
	no_req: "1230 1231 1423",
	name: "mandiri ku",
	location: "semarang",
	type: "atm",
	desc: "atm kui di gesek",
	userId: "cm0ray6cb0001rsx0eaaiat90",
}
const dataTestUpdate: BankUpdate = {
	phone: "(024) 1233 12343 ",
	img: "not have image",
	no_req: "1230 1231 1423",
	name: "mandiri ku update",
	location: "semarang",
	type: "atm",
	desc: "atm kui di gesek",
}
export const bankDataList: Omit<BankDB, 'created_at' | 'updated_at'>[] = [
	{
		id: 503,
		name: "Bank ABC",
		phone: "081234567898",
		no_req: "1234-5678-9876",
		location: "Bandung",
		type: "Savings Account",
		img: "https://example.com/bank_abc.jpg",
		desc: "High-interest savings account with zero monthly fees",
		userId: "cm0ray6cb0001rsx0eaaiat90",
		
	},
	{
		id: 504,
		name: "Bank DEF",
		phone: "081234567899",
		no_req: "3456-7890-1234",
		location: "Jakarta",
		type: "Business Account",
		img: "https://example.com/bank_def_logo.jpg",
		desc: "Business account with flexible transaction limits",
		userId: "USR3004"
	},
	{
		id: 505,
		name: "Bank XYZ",
		phone: "081234567800",
		no_req: "5678-9012-3456",
		location: "Surabaya",
		type: "Checking Account",
		img: null,
		desc: "Checking account with cashback on purchases",
		userId: "USR3005"
	},
	{
		id: 506,
		name: "Bank GHI",
		phone: "081234567801",
		no_req: "7890-1234-5678",
		location: "Medan",
		type: "Investment Account",
		img: "https://example.com/bank_ghi_logo.jpg",
		desc: "Investment account with market-linked returns",
		userId: "USR3006"
	},
	{
		id: 507,
		name: "Bank JKL",
		phone: "081234567802",
		no_req: "9012-3456-7890",
		location: "Bali",
		type: "Foreign Currency Account",
		img: null,
		desc: "Account with access to multiple foreign currencies",
		userId: "USR3007"
	}
];
