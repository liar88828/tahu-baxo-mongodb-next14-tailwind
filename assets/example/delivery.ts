import { DeliveryDB } from "@prisma/client";
import type { DeliveryCreate } from "@/interface/model/delivery.type";
import type { CreateDB } from "@/interface/model/transaction.type";
import { expect } from "vitest";

export const dataTestDelivery: DeliveryCreate = {
	price: 123,
	phone: '0234 2342 2342',
	img: "http:image is noting",
	type: "Test Data",
	desc: "Is Test Data not for sell",
	location: "this location not expose",
	name: "is test delivery",
	userId: 'cm0ray6cb0001rsx0eaaiat90'
}
export const dataTestDeliveryEmpty: DeliveryCreate = {
	price: 0,
	phone: '',
	img: "",
	type: "",
	desc: "",
	location: "",
	name: "",
	userId: ''
}

export const expectationDelivery: DeliveryDB = {
	price: expect.any(Number),
	phone: expect.any(String),
	id: expect.any(Number),
	img: expect.any(String),
	type: expect.any(String),
	desc: expect.any(String),
	location: expect.any(String),
	name: expect.any(String),
	userId: expect.any(String)
}

export const deliveryDataList: DeliveryDB[] = [
	{
		id: 301,
		name: "Mountain Bike",
		phone: "081234567894",
		location: "Bandung",
		type: "Outdoor Equipment",
		price: 3500000,
		img: "https://example.com/mountain_bike.jpg",
		desc: "High-quality mountain bike with 21-speed gears",
		userId: "cm0ray6cb0001rsx0eaaiat90"
	}, {
		id: 302,
		name: "Camping Tent",
		phone: "081234567895",
		location: "Yogyakarta",
		type: "Outdoor Equipment",
		price: 750000,
		img: null,
		desc: "Durable camping tent for 4 people, weather-resistant",
		userId: "cm0ray6cb0001rsx0eaaiat90"
	}
]

export const dataTestCreate: DeliveryCreate = {
	price: 50000,
	phone: "081234567890",
	id: 1,
	img: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
	type: "Restaurant",
	desc: "A popular spot for traditional Indonesian food.",
	location: "Jakarta, Indonesia",
	name: "Warung Makan Sederhana",
	userId: "asdas",
}

export const dataTestCreate2: DeliveryCreate = {
	price: 100000,
	phone: "081987654321",
	id: 2,
	img: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
	type: "Bookstore",
	desc: "A well-stocked bookstore with a wide variety of genres.",
	location: "Bandung, Indonesia",
	name: "Toko Buku Sejahtera",
	userId: "asdas",
}

export const deliveryTransaction: CreateDB<DeliveryCreate> & { userId: string } = {
	price: 25000,
	img: "https://example.com/delivery_truck.jpg",
	type: "Courier Service",
	phone: "081234567891",
	desc: "Fast delivery within 24 hours",
	location: "Bandung",
	name: "FastExpress",
	// id: 0,
	userId: "",
}
