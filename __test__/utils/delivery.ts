import type { DeliveryDB } from "@prisma/client"
import type { DeliveryCreate } from "@/interface/model/delivery.type"
import type { CreateDB } from "@/interface/model/transaction.type"

export const dataTestCreate: DeliveryCreate = {
	id: 1,
	nama: "Warung Makan Sederhana",
	hp: "081234567890",
	lokasi: "Jakarta, Indonesia",
	jenis: "Restaurant",
	harga: 50000,
	img: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
	keterangan: "A popular spot for traditional Indonesian food.",
	userId: "asdas",
}

export const dataTestCreate2: DeliveryCreate = {
	id: 2,
	nama: "Toko Buku Sejahtera",
	hp: "081987654321",
	lokasi: "Bandung, Indonesia",
	jenis: "Bookstore",
	harga: 100000,
	img: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
	keterangan: "A well-stocked bookstore with a wide variety of genres.",
	userId: "asdas",
}

export const dataTestUpdate = structuredClone(dataTestCreate)
dataTestUpdate.nama = "Kedai Kopi Nusantara"

export const dataTestError = structuredClone(dataTestCreate)
//@ts-expect-error
dataTestError.nama = 123

export async function createDelivery(
	delivery: CreateDB<DeliveryCreate>,
	token: string
): Promise<DeliveryDB> {
	const res = await fetch("http://localhost:3000/api/delivery", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${ token }`,
		},
		body: JSON.stringify(delivery),
	})
	const code = res.status
	return await res.json()
}

export const deliveryTransaction = {
	harga: 25000,
	img: "https://example.com/delivery_truck.jpg",
	jenis: "Courier Service",
	hp: "081234567891",
	keterangan: "Fast delivery within 24 hours",
	lokasi: "Bandung",
	nama: "FastExpress",
	userId: "",
}
