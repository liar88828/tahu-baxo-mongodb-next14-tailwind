import type { ProductDB } from "@prisma/client";
import type { ProductCreate, ProductUpdate } from "@/interface/model/product.type";
import { expect } from "vitest";

export const dataTestProduct: ProductCreate = {
	price: 123,
	img: "http:image is noting",
	type: "Test Data",
	qty: 123,
	desc: "Is Test Data not for sell",
	location: "this location not expose",
	name: "is test product",
	userId: "",
}
export const dataTestProductEmpty: ProductCreate = {
	price: 0,
	img: "",
	type: "",
	qty: 0,
	desc: "",
	location: "",
	name: "",
	userId: "",
}

export const expectationProduct: ProductCreate = {
	price: expect.any(Number),
	img: expect.any(String),
	type: expect.any(String),
	qty: expect.any(Number),
	desc: expect.any(String),
	location: expect.any(String),
	name: expect.any(String),
	userId: expect.any(String),
}

export const productTransaction: Omit<ProductDB, 'updated_at' | 'created_at'> = {
	qty: 10,
	name: "Laptop XYZ",
	location: "Surabaya",
	type: "Electronics",
	price: 7500000,
	desc: "Brand new laptop with 16GB RAM and 512GB SSD",
	id: 101,
	img: "https://example.com/laptop_xyz.jpg",
	userId: "cm0ray6cb0001rsx0eaaiat90",
}

export const productCreateExample: ProductCreate = {
	price: 123,
	img: "http:image is noting",
	type: "Test Data",
	qty: 123,
	desc: "Is Test Data not for sell",
	location: "this location not expose",
	name: "is test product",
	userId: 'cm0ray6cb0001rsx0eaaiat90'
}

export const productUpdate: ProductUpdate = {
	price: 123,
	img: "http:image is noting",
	type: "Test Data",
	qty: 123,
	desc: "Is Test Data not for sell",
	location: "this location not expose",
	name: "is test product",
	userId: 'cm0ray6cb0001rsx0eaaiat90'
}

export const productDataList: Omit<ProductDB, 'updated_at' | 'created_at'>[] = [
	{
		qty: 123,
		name: "Laptop Pro 15",
		location: "Jakarta",
		type: "Electronics",
		price: 12000000,
		desc: "Powerful laptop with 16GB RAM and 1TB SSD storage",
		id: 2,
		img: "https://example.com/laptop_pro_15.jpg",
		userId: "USR1001"
	},
	{
		qty: 2342,
		name: "Running Shoes",
		location: "Bandung",
		type: "Apparel",
		price: 750000,
		desc: "Comfortable running shoes for all terrains",
		id: 1,
		img: "https://example.com/running_shoes.jpg",
		userId: "USR1002"
	},
	{
		qty: 4564,
		name: "Bluetooth Headphones",
		location: "Surabaya",
		type: "Accessories",
		price: 500000,
		desc: "Wireless headphones with noise cancellation",
		id: 3,
		img: "https://example.com/bluetooth_headphones.jpg",
		userId: "USR1003"
	},
	{
		qty: 30,
		name: "Gaming Chair",
		location: "Medan",
		type: "Furniture",
		price: 3000000,
		desc: "Ergonomic chair for long gaming sessions",
		id: 4,
		img: "https://example.com/gaming_chair.jpg",
		userId: "USR1004"
	},
	{
		qty: 4564,
		name: "Organic Coffee Beans",
		location: "Bali",
		type: "Food & Beverages",
		price: 150000,
		desc: "Premium organic coffee beans sourced from local farms",
		id: 5,
		img: "https://example.com/organic_coffee.jpg",
		userId: "USR1005"
	},
	
	{
		qty: 15,
		name: "Electric Scooter",
		location: "Semarang",
		type: "Transportation",
		price: 8500000,
		desc: "Lightweight electric scooter with a range of 30 km per charge",
		id: 6,
		img: "https://example.com/electric_scooter.jpg",
		userId: "USR1006"
	},
	{
		qty: 40,
		name: "Wireless Mouse",
		location: "Malang",
		type: "Accessories",
		price: 250000,
		desc: "Compact wireless mouse with adjustable DPI",
		id: 7,
		img: "https://example.com/wireless_mouse.jpg",
		userId: "USR1007"
	},
	{
		qty: 60,
		name: "Yoga Mat",
		location: "Denpasar",
		type: "Fitness",
		price: 200000,
		desc: "Non-slip yoga mat made from eco-friendly materials",
		id: 8,
		img: "https://example.com/yoga_mat.jpg",
		userId: "USR1008"
	},
	{
		qty: 20,
		name: "Smart Watch",
		location: "Palembang",
		type: "Wearables",
		price: 1500000,
		desc: "Smartwatch with heart rate monitor and GPS tracking",
		id: 9,
		img: "https://example.com/smart_watch.jpg",
		userId: "USR1009"
	},
	{
		qty: 35,
		name: "Digital Camera",
		location: "Makassar",
		type: "Electronics",
		price: 5000000,
		desc: "High-resolution digital camera with 4K video recording",
		id: 10,
		img: "https://example.com/digital_camera.jpg",
		userId: "USR1010"
	}
]
