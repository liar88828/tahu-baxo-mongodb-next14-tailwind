import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import prisma from "@/config/prisma";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";

import { DeliveryDB } from "@prisma/client";
import { DeliveryCreate } from "@/interface/model/delivery.type";
import { RegisterUser } from "@/interface/model/auth.type";

const testExpectation: DeliveryDB = {
	id: expect.any(Number),
	userId: expect.any(String),
	harga: 123,
	img: "http:image is noting",
	jenis: "Test Data",
	hp: expect.any(String),
	keterangan: "Is Test Data not for sell",
	lokasi: "this location not expose",
	nama: "is test delivery",
}
const dataTestDelivery: DeliveryCreate = {
	harga: 123,
	img: "http:image is noting",
	jenis: "Test Data",
	hp: '0234 2342 2342',
	keterangan: "Is Test Data not for sell",
	lokasi: "this location not expose",
	nama: "is test delivery",
	userId: ''
}
const dataTestDeliveryEmpty: DeliveryCreate = {
	harga: 0,
	img: "",
	jenis: "",
	hp: '',
	keterangan: "",
	lokasi: "",
	nama: "",
	userId: ''
}

let deliveryToken = ''
let deliveryId = 0

const registerData: RegisterUser = {
	"fullname": "userDelivery",
	"email": "userDelivery@gmail.com",
	"password": "user1234",
	"confPass": "user1234",
	"phone": "081 1232 1234",
	"address": "jln jakarta raya"
}
export let deliveryFinish = false
describe
	//.skipIf(bankFinish === true)
	('can test api delivery', async () => {
		beforeAll(async () => {
			const { data, accessToken } = await registerTest('delivery');
			deliveryToken = accessToken
			dataTestDelivery.userId = data.id
		})
		afterAll(async () => {
				await prisma.deliveryDB.deleteMany()
				await deleteUserTest(deliveryToken)
				
			}
		)
		
		describe("POST can create Data Delivery", async () => {
			
			it('ERROR Create data delivery, not have token', async () => {
				const testExpectation: DeliveryDB = {
					id: expect.any(Number),
					userId: expect.any(String),
					harga: 123,
					img: "http:image is noting",
					jenis: "Test Data",
					hp: "1324 2342 2345",
					keterangan: "Is Test Data not for sell",
					lokasi: "this location not expose",
					nama: "is test delivery",
				}
				
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ 'empty token' }`
					},
					body: JSON.stringify(dataTestDelivery),
				})
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(testExpectation)
				expect(code).toBe(400)
				expect(data).toBe("jwt malformed")
				
			})
			
			it('ERROR Create data delivery, is empty', async () => {
				const testExpectation: DeliveryDB = {
					id: expect.any(Number),
					userId: expect.any(String),
					harga: 123,
					img: "http:image is noting",
					jenis: "Test Data",
					hp: "1324 2342 2345",
					keterangan: "Is Test Data not for sell",
					lokasi: "this location not expose",
					nama: "is test delivery",
				}
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify({}),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(testExpectation)
				
				expect(code).toBe(400)
				expect(data).length(7)
			})
			
			it('ERROR Create data delivery, name is empty', async () => {
				const test = structuredClone(dataTestDelivery)
				test.nama = ''
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
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
					nama: "is test delivery",
					userId: expect.any(String)
				})
				
				expect(code).toBe(400)
				expect(data).length(1)
			})
			
			it('SUCCESS Create data delivery ', async () => {
				const testExpectation: DeliveryDB = {
					id: expect.any(Number),
					userId: expect.any(String),
					harga: 123,
					img: "http:image is noting",
					jenis: "Test Data",
					hp: '0234 2342 2342',
					keterangan: "Is Test Data not for sell",
					lokasi: "this location not expose",
					nama: "is test delivery",
				}
				
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(dataTestDelivery),
				})
				const code = res.status
				const data = await res.json()
				deliveryId = data.id
				expect(code).toBe(200)
				expect(data).toMatchObject(testExpectation)
			})
		})
		
		describe("GET can get Data Delivery", async () => {
			
			it('SUCCESS GET data delivery all delivery', async () => {
				
				const res = await fetch("http://localhost:3000/api/delivery", {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).toBe(200)
				expect(data).toMatchObject({
					data: [testExpectation],
					"page": expect.any(Number),
					"take": expect.any(Number)
					
				})
				expect(code).not.toBe(400)
				
			})
			
			it('SUCCESS GET data delivery my id', async () => {
				
				const test: DeliveryDB = {
					harga: expect.any(Number),
					img: expect.any(String),
					jenis: expect.any(String),
					hp: expect.any(String),
					keterangan: expect.any(String),
					lokasi: expect.any(String),
					nama: expect.any(String),
					userId: expect.any(String),
					id: expect.any(Number)
				}
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).toBe(200)
				expect(data).toMatchObject(test)
				expect(code).not.toBe(400)
			})
			
			it('SUCCESS GET data delivery. wrong id', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'not know' }`, {
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
		
		describe("PUT can create Data Delivery", async () => {
			
			it('ERROR PUT data delivery, not have token', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'woring id' }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ 'empty token' }`
					},
					body: JSON.stringify(dataTestDelivery),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(testExpectation)
				expect(code).toBe(400)
				expect(data).toBe("jwt malformed")
				
			})
			
			it('ERROR PUT data delivery, wrong id', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'woring id' }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(dataTestDelivery),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(testExpectation)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
			it('ERROR PUT data delivery, data is has empty object', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify({}),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(testExpectation)
				expect(code).toBe(400)
				expect(code).toBe(400)
				
			})
			
			it('ERROR PUT data delivery, data is has empty value', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(dataTestDeliveryEmpty),
				})
				const code = res.status
				const data = await res.json()
				console.log(data)
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(testExpectation)
				expect(code).toBe(400)
				expect(data).length(5)
			})
			
			it('ERROR PUT data delivery, name is empty', async () => {
				const test = structuredClone(dataTestDelivery)
				test.nama = ''
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
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
					nama: "is test delivery",
					userId: expect.any(String)
				})
				
				expect(code).toBe(400)
				expect(data).length(1)
			})
			
			it('SUCCESS PUT data delivery use mock', async () => {
				const test = structuredClone(dataTestDelivery)
				test.nama = 'name delivery is updated'
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
					body: JSON.stringify(test),
				})
				const code = res.status
				const data = await res.json()
				deliveryId = data.id
				expect(code).toBe(200)
				expect(data).toMatchObject({
					harga: 123,
					img: "http:image is noting",
					jenis: "Test Data",
					hp: '0234 2342 2342',
					keterangan: "Is Test Data not for sell",
					lokasi: "this location not expose",
					nama: test.nama,
					userId: expect.any(String)
				})
			})
		})
		
		describe("DELETE can create Data Delivery", async () => {
			
			it('ERROR delete data delivery. not have token', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'not know' }`, {
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
			
			it('ERROR delete data delivery. wrong id ', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ 'not know' }`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
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
			
			it('SUCCESS delete data delivery.', async () => {
				
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).toBe(200)
				expect(data).toMatchObject({
					harga: expect.any(Number),
					img: expect.any(String),
					jenis: expect.any(String),
					hp: expect.any(String),
					keterangan: expect.any(String),
					lokasi: expect.any(String),
					nama: "name delivery is updated",
					userId: expect.any(String),
					id: expect.any(Number)
				})
				expect(code).not.toBe(400)
			})
			
			it('ERROR delete data delivery. data has deleted', async () => {
				const res = await fetch(`http://localhost:3000/api/delivery/${ deliveryId }`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
						"Authorization": `Bearer ${ deliveryToken }`
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject({
					harga: expect.any(Number),
					img: expect.any(String),
					jenis: expect.any(String),
					hp: expect.any(String),
					keterangan: expect.any(String),
					lokasi: expect.any(String),
					nama: "name delivery is updated",
					userId: expect.any(String),
					id: expect.any(Number)
				})
				console.log(data)
				expect(code).toBe(400)
				expect(data).toBe('Data is Not Found maybe was been delete')
				deliveryFinish = true
			})
			
		})
})
