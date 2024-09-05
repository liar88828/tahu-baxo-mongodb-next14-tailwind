import { RegisterUser } from "@/server/schema/user.schema";
import { ProductCreate } from "@/server/schema/product.schema";
import { DeliveryCreate } from "@/interface/delivery";
import { BankCreate } from "@/server/schema/bank.schema";
import { ProductDB } from ".prisma/client";
import { BankDB, DeliveryDB, PenerimaDB } from "@prisma/client";
import { config } from "@/config/baseConfig";

type CreateDB<T> = Omit<T, 'userId'>

export async function createProduct(
	product: CreateDB<ProductCreate>,
	token: string): Promise<ProductDB> {
	const res = await fetch("http://localhost:3000/api/product", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
		body: JSON.stringify(product),
	})
	const code = res.status
	return await res.json()
	
}

export async function createPenerima(
	penerima: PenerimaTransaction,
	token: string): Promise<DeliveryDB> {
	
	const res = await fetch("http://localhost:3000/api/penerima", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
		body: JSON.stringify(penerima),
	})
	const code = res.status
	return await res.json()
	
}

export async function createDelivery(
	delivery: CreateDB<DeliveryCreate>,
	token: string): Promise<DeliveryDB> {
	
	const res = await fetch("http://localhost:3000/api/delivery", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
		body: JSON.stringify(delivery),
	})
	const code = res.status
	return await res.json()
	
}

export async function createBank(
	bank: CreateDB<BankCreate>,
	token: string
): Promise<BankDB> {
	
	const res = await fetch("http://localhost:3000/api/bank", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${ token }`
		},
		body: JSON.stringify(bank),
	})
	const code = res.status
	return await res.json()
}

export const registerUserTransaction: RegisterUser = {
	"fullname": "userTransaction",
	"email": "userTransaction@gmail.com",
	"password": "user1234",
	"confPass": "user1234",
	"phone": "081 1232 1234",
	"address": "jln jakarta raya"
}

export const productTransaction = {
	jumlah: 10,
	nama: "Laptop XYZ",
	lokasi: "Surabaya",
	jenis: "Electronics",
	harga: 7500000,
	keterangan: "Brand new laptop with 16GB RAM and 512GB SSD",
	id: 101,
	img: "https://example.com/laptop_xyz.jpg",
	userId: ''
	
};

export const bankTransaction = {
	no: "1234-5678-9012-3456",
	hp: "081234567892",
	img: "https://example.com/payment_logo.jpg",
	jenis: "Credit Card",
	keterangan: "Mastercard ending in 3456",
	lokasi: "Jakarta",
	nama: "John Doe",
	userId: ''
};

export const deliveryTransaction = {
	harga: 25000,
	img: "https://example.com/delivery_truck.jpg",
	jenis: "Courier Service",
	hp: "081234567891",
	keterangan: "Fast delivery within 24 hours",
	lokasi: "Bandung",
	nama: "FastExpress",
	userId: ''
};

export const penerimaTransaction: PenerimaTransaction = {
	nama: "Alice Johnson",
	alamat: "Jl. Merdeka No. 123, Jakarta",
	hp: "081234567893"
};

export type PenerimaTransaction = Omit<PenerimaDB, 'id'>;

export async function deleteTransaction(id:number) {
	const res = await fetch(`${ config.url }/api/transactions/checkout/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			// "Authorization": `Bearer ${ token }`
		}
	})
	
	const data = await res.json()
	console.log(data)
}
