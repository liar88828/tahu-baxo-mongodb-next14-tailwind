import { it } from "vitest";
import prisma from "@/config/prisma";

const productDataList = [
	{
		jumlah: 123,
		nama: "Laptop Pro 15",
		lokasi: "Jakarta",
		jenis: "Electronics",
		harga: 12000000,
		keterangan: "Powerful laptop with 16GB RAM and 1TB SSD storage",
		id: 534,
		img: "https://example.com/laptop_pro_15.jpg",
		userId: "USR1001"
	},
	{
		jumlah: 2342,
		nama: "Running Shoes",
		lokasi: "Bandung",
		jenis: "Apparel",
		harga: 750000,
		keterangan: "Comfortable running shoes for all terrains",
		id: 47856,
		img: "https://example.com/running_shoes.jpg",
		userId: "USR1002"
	},
	{
		jumlah: 4564,
		nama: "Bluetooth Headphones",
		lokasi: "Surabaya",
		jenis: "Accessories",
		harga: 500000,
		keterangan: "Wireless headphones with noise cancellation",
		id: 45647,
		img: "https://example.com/bluetooth_headphones.jpg",
		userId: "USR1003"
	},
	{
		jumlah: 30,
		nama: "Gaming Chair",
		lokasi: "Medan",
		jenis: "Furniture",
		harga: 3000000,
		keterangan: "Ergonomic chair for long gaming sessions",
		id: 204,
		img: "https://example.com/gaming_chair.jpg",
		userId: "USR1004"
	},
	{
		jumlah: 4564,
		nama: "Organic Coffee Beans",
		lokasi: "Bali",
		jenis: "Food & Beverages",
		harga: 150000,
		keterangan: "Premium organic coffee beans sourced from local farms",
		id: 45645,
		img: "https://example.com/organic_coffee.jpg",
		userId: "USR1005"
	},
	
	{
		jumlah: 15,
		nama: "Electric Scooter",
		lokasi: "Semarang",
		jenis: "Transportation",
		harga: 8500000,
		keterangan: "Lightweight electric scooter with a range of 30 km per charge",
		id: 206,
		img: "https://example.com/electric_scooter.jpg",
		userId: "USR1006"
	},
	{
		jumlah: 40,
		nama: "Wireless Mouse",
		lokasi: "Malang",
		jenis: "Accessories",
		harga: 250000,
		keterangan: "Compact wireless mouse with adjustable DPI",
		id: 207,
		img: "https://example.com/wireless_mouse.jpg",
		userId: "USR1007"
	},
	{
		jumlah: 60,
		nama: "Yoga Mat",
		lokasi: "Denpasar",
		jenis: "Fitness",
		harga: 200000,
		keterangan: "Non-slip yoga mat made from eco-friendly materials",
		id: 208,
		img: "https://example.com/yoga_mat.jpg",
		userId: "USR1008"
	},
	{
		jumlah: 20,
		nama: "Smart Watch",
		lokasi: "Palembang",
		jenis: "Wearables",
		harga: 1500000,
		keterangan: "Smartwatch with heart rate monitor and GPS tracking",
		id: 209,
		img: "https://example.com/smart_watch.jpg",
		userId: "USR1009"
	},
	{
		jumlah: 35,
		nama: "Digital Camera",
		lokasi: "Makassar",
		jenis: "Electronics",
		harga: 5000000,
		keterangan: "High-resolution digital camera with 4K video recording",
		id: 210,
		img: "https://example.com/digital_camera.jpg",
		userId: "USR1010"
	}
]

const deliveryDataList = [
	{
		id: 301,
		nama: "Mountain Bike",
		hp: "081234567894",
		lokasi: "Bandung",
		jenis: "Outdoor Equipment",
		harga: 3500000,
		img: "https://example.com/mountain_bike.jpg",
		keterangan: "High-quality mountain bike with 21-speed gears",
		userId: "cm0ray6cb0001rsx0eaaiat90"
	}, {
		id: 302,
		nama: "Camping Tent",
		hp: "081234567895",
		lokasi: "Yogyakarta",
		jenis: "Outdoor Equipment",
		harga: 750000,
		img: null,
		keterangan: "Durable camping tent for 4 people, weather-resistant",
		userId: "cm0ray6cb0001rsx0eaaiat90"
	}
]
let transactionToken = ''
let idUser = ''
it('should seed prisma', async () => {
	// const { data, accessToken } = await registerTest("seed")
	// transactionToken = accessToken
	// idUser = data.id
	
	// await createProduct(productTransaction, accessToken)
	const dataProductMany = productDataList.map(d => {
		return {
			jumlah: d.jumlah,
			nama: d.nama,
			lokasi: d.lokasi,
			jenis: d.jenis,
			harga: d.harga,
			keterangan: d.keterangan,
			id: Number(Date.now() / d.id),
			img: d.img,
			userId: "cm0ray6cb0001rsx0eaaiat90",
		}
	})
	await prisma.productDB.createMany({
		data: dataProductMany
	})
	
	await prisma.deliveryDB.createMany({
		data: deliveryDataList
	})
});