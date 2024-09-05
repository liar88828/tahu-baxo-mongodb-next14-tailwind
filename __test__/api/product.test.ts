import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import prisma from "@/config/prisma";
import { ProductCreate } from "@/server/schema/product.schema";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";
import { RegisterUser } from "@/server/schema/user.schema";

const dataTestProduct: ProductCreate = {
	harga: 123,
	img: "http:image is noting",
	jenis: "Test Data",
	jumlah: 123,
	keterangan: "Is Test Data not for sell",
	lokasi: "this location not expose",
	nama: "is test product",
	userId: ''
}
const dataTestProductEmpty: ProductCreate = {
	harga: 0,
	img: "",
	jenis: "",
	jumlah: 0,
	keterangan: "",
	lokasi: "",
	nama: "",
	userId: ''
}

let productToken = ''
let productId = 0

const registerData: RegisterUser = {
	"fullname": "userProduct",
	"email": "userProduct@gmail.com",
	"password": "user1234",
	"confPass": "user1234",
	"phone": "081 1232 1234",
	"address": "jln jakarta raya"
}

describe.skip('can test api product', async () => {
	beforeAll(async () => {
		const { data, accessToken } = await registerTest(registerData);
		productToken = accessToken
		dataTestProduct.userId = data.id
	})
	afterAll(async () => {
		await prisma.productDB.deleteMany()
		await deleteUserTest(productToken)
 
	})
	
	describe("POST can create Data Product", async () => {
		
		it('ERROR Create data product, not have token', async () => {
			const res = await fetch("http://localhost:3000/api/product", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ 'empty token' }`
				},
				body: JSON.stringify(dataTestProduct),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: 123,
				img: "http:image is noting",
				jenis: "Test Data",
				jumlah: 123,
				keterangan: "Is Test Data not for sell",
				lokasi: "this location not expose",
				nama: "is test product",
				userId: expect.any(String)
			})
			expect(code).toBe(400)
			expect(code).toBe(400)
			
		})
		
		it('ERROR Create data product, is empty', async () => {
			const res = await fetch("http://localhost:3000/api/product", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
				body: JSON.stringify({}),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: 123,
				img: "http:image is noting",
				jenis: "Test Data",
				jumlah: 123,
				keterangan: "Is Test Data not for sell",
				lokasi: "this location not expose",
				nama: "is test product",
				userId: expect.any(String)
			})
			
			expect(code).toBe(400)
			expect(data).length(7)
		})
		
		it('ERROR Create data product, name is empty', async () => {
			const test = structuredClone(dataTestProduct)
			test.nama = ''
			const res = await fetch("http://localhost:3000/api/product", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
				body: JSON.stringify(test),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: 123,
				img: "http:image is noting",
				jenis: "Test Data",
				jumlah: 123,
				keterangan: "Is Test Data not for sell",
				lokasi: "this location not expose",
				nama: "is test product",
				userId: expect.any(String)
			})
			
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it('SUCCESS Create data product use mock', async () => {
			const res = await fetch("http://localhost:3000/api/product", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
				body: JSON.stringify(dataTestProduct),
			})
			const code = res.status
			const data = await res.json()
			productId = data.id
			expect(code).toBe(200)
			expect(data).toMatchObject({
				harga: 123,
				img: "http:image is noting",
				jenis: "Test Data",
				jumlah: 123,
				keterangan: "Is Test Data not for sell",
				lokasi: "this location not expose",
				nama: "is test product",
				userId: expect.any(String)
			})
		})
	})
	
	describe("GET can get Data Product", async () => {
		
		it('SUCCESS GET data product all product', async () => {
			const res = await fetch("http://localhost:3000/api/product", {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).toBe(200)
			expect(data).toMatchObject({
				data: [
					{
						harga: expect.any(Number),
						img: expect.any(String),
						jenis: expect.any(String),
						jumlah: expect.any(Number),
						keterangan: expect.any(String),
						lokasi: expect.any(String),
						nama: expect.any(String),
						userId: expect.any(String)
					},
				],
				"page": expect.any(Number),
				"take": expect.any(Number)
				
			})
			expect(code).not.toBe(400)
			
		})
		
		it('SUCCESS GET data product my id', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ productId }`, {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).toBe(200)
			expect(data).toMatchObject({
				harga: expect.any(Number),
				img: expect.any(String),
				jenis: expect.any(String),
				jumlah: expect.any(Number),
				keterangan: expect.any(String),
				lokasi: expect.any(String),
				nama: expect.any(String),
				userId: expect.any(String),
				id: expect.any(Number)
			})
			expect(code).not.toBe(400)
			
		})
		
		it('SUCCESS GET data product. wrong id', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ 'not know' }`, {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: expect.any(Number),
				img: expect.any(String),
				jenis: expect.any(String),
				jumlah: expect.any(Number),
				keterangan: expect.any(String),
				lokasi: expect.any(String),
				nama: expect.any(String),
				userId: expect.any(String),
				id: expect.any(Number)
			})
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
	})
	
	describe("PUT can create Data Product", async () => {
		
		it('ERROR PUT data product, not have token', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ 'woring id' }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ 'empty token' }`
				},
				body: JSON.stringify(dataTestProduct),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: expect.any(Number),
				img: expect.any(String),
				jenis: expect.any(String),
				jumlah: expect.any(Number),
				keterangan: expect.any(String),
				lokasi: expect.any(String),
				nama: expect.any(String),
				userId: expect.any(String),
				id: expect.any(Number)
			})
			expect(code).toBe(400)
			expect(data).toBe("jwt malformed")
			
		})
		
		it('ERROR PUT data product, wrong id', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ 'woring id' }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
				body: JSON.stringify(dataTestProduct),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: expect.any(Number),
				img: expect.any(String),
				jenis: expect.any(String),
				jumlah: expect.any(Number),
				keterangan: expect.any(String),
				lokasi: expect.any(String),
				nama: expect.any(String),
				userId: expect.any(String),
				id: expect.any(Number)
			})
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it('ERROR PUT data product, data is has empty object', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ productId }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
				body: JSON.stringify({}),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: 123,
				img: "http:image is noting",
				jenis: "Test Data",
				jumlah: 123,
				keterangan: "Is Test Data not for sell",
				lokasi: "this location not expose",
				nama: "is test product",
				userId: expect.any(String)
			})
			expect(code).toBe(400)
			expect(code).toBe(400)
			
		})
		
		it('ERROR PUT data product, data is has empty value', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ productId }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
				body: JSON.stringify(dataTestProductEmpty),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: 123,
				img: "http:image is noting",
				jenis: "Test Data",
				jumlah: 123,
				keterangan: "Is Test Data not for sell",
				lokasi: "this location not expose",
				nama: "is test product",
				userId: expect.any(String)
			})
			
			expect(code).toBe(400)
			expect(data).length(4)
		})
		
		it('ERROR PUT data product, name is empty', async () => {
			const test = structuredClone(dataTestProduct)
			test.nama = ''
			const res = await fetch(`http://localhost:3000/api/product/${ productId }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
				body: JSON.stringify(test),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: 123,
				img: "http:image is noting",
				jenis: "Test Data",
				jumlah: 123,
				keterangan: "Is Test Data not for sell",
				lokasi: "this location not expose",
				nama: "is test product",
				userId: expect.any(String)
			})
			
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it('SUCCESS PUT data product use mock', async () => {
			const test = structuredClone(dataTestProduct)
			test.nama = 'name product is updated'
			const res = await fetch(`http://localhost:3000/api/product/${ productId }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
				body: JSON.stringify(test),
			})
			const code = res.status
			const data = await res.json()
			productId = data.id
			expect(code).toBe(200)
			expect(data).toMatchObject({
				harga: 123,
				img: "http:image is noting",
				jenis: "Test Data",
				jumlah: 123,
				keterangan: "Is Test Data not for sell",
				lokasi: "this location not expose",
				nama: test.nama,
				userId: expect.any(String)
			})
		})
	})
	describe("DELETE can create Data Product", async () => {
		
		it('ERROR delete data product. not have token', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ 'not know' }`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: expect.any(Number),
				img: expect.any(String),
				jenis: expect.any(String),
				jumlah: expect.any(Number),
				keterangan: expect.any(String),
				lokasi: expect.any(String),
				nama: expect.any(String),
				userId: expect.any(String),
				id: expect.any(Number)
			})
			console.log(data)
			expect(code).toBe(400)
			expect(data).toBe('Not have token in Bearer')
		})
		
		it('ERROR delete data product. wrong id ', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ 'not know' }`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: expect.any(Number),
				img: expect.any(String),
				jenis: expect.any(String),
				jumlah: expect.any(Number),
				keterangan: expect.any(String),
				lokasi: expect.any(String),
				nama: expect.any(String),
				userId: expect.any(String),
				id: expect.any(Number)
			})
			console.log(data)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it('SUCCESS delete data product.', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ productId }`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).toBe(200)
			expect(data).toMatchObject({
				harga: expect.any(Number),
				img: expect.any(String),
				jenis: expect.any(String),
				jumlah: expect.any(Number),
				keterangan: expect.any(String),
				lokasi: expect.any(String),
				nama: expect.any(String),
				userId: expect.any(String),
				id: expect.any(Number)
			})
			expect(code).not.toBe(400)
		})
		
		it('ERROR delete data product. data has deleted', async () => {
			const res = await fetch(`http://localhost:3000/api/product/${ productId }`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ productToken }`
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject({
				harga: expect.any(Number),
				img: expect.any(String),
				jenis: expect.any(String),
				jumlah: expect.any(Number),
				keterangan: expect.any(String),
				lokasi: expect.any(String),
				nama: expect.any(String),
				userId: expect.any(String),
				id: expect.any(Number)
			})
			console.log(data)
			expect(code).toBe(400)
			expect(data).toBe('Data is Not Found maybe was been delete')
		})
		
	})
})
