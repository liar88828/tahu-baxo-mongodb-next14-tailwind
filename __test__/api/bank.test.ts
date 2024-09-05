import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import prisma from "@/config/prisma";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";
import { BankCreate } from "@/server/schema/bank.schema";
import { BankDB } from "@prisma/client";
import { RegisterUser } from "@/server/schema/user.schema";
import { userFinish } from "@/__test__/api/user.test";

const dataTestBank = {
	no: "084 2342 2342 4323",
	hp: "1231-2534-3454-2245",
	img: "http:image is noting",
	jenis: "Test Data",
	keterangan: "Is Test Data not for sell",
	lokasi: "this location not expose",
	nama: "is test bank",
	userId: ''
}
const dataTestBankEmpty: BankCreate = {
	no: "0",
	img: "",
	jenis: "",
	hp: "0",
	keterangan: "",
	lokasi: "",
	nama: "",
	userId: ''
}

let bankToken = ''
let bankId = 0
const dataExpect: BankDB = {
	no: "084 2342 2342 4323",
	img: "http:image is noting",
	jenis: "Test Data",
	hp: "1231-2534-3454-2245",
	keterangan: "Is Test Data not for sell",
	lokasi: "this location not expose",
	nama: "is test bank",
	userId: expect.any(String),
	id: expect.any(Number)
}

const dataExpectType: BankCreate = {
	hp: expect.any(String),
	img: expect.any(String),
	jenis: expect.any(String),
	no: expect.any(String),
	keterangan: expect.any(String),
	lokasi: expect.any(String),
	nama: expect.any(String),
	userId: expect.any(String),
	id: expect.any(Number)
	
}
const registerData: RegisterUser = {
	"fullname": "bankRegister",
	"email": "bankRegister@gmail.com",
	"password": "user1234",
	"confPass": "user1234",
	"phone": "081 1232 1234",
	"address": "jln jakarta raya"
}
export let bankFinish = false

describe('can test api bank', async () => {
	beforeAll(async () => {
		const { data, accessToken } = await registerTest();
		bankToken = accessToken
		dataTestBank.userId = data.id
	})
	afterAll(async () => {
		await prisma.bankDB.deleteMany()
		await deleteUserTest(bankToken)
	})
	describe.skipIf(userFinish === true)("POST can create Data Bank", async () => {
		
		it('ERROR Create data bank, not have token', async () => {
			const res = await fetch("http://localhost:3000/api/bank", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ 'empty token' }`
				},
				body: JSON.stringify(dataTestBank),
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
				nama: "is test bank",
				userId: expect.any(String)
			})
			expect(code).toBe(400)
			expect(code).toBe(400)
			
		})
		
		it('ERROR Create data bank, is empty', async () => {
			const res = await fetch("http://localhost:3000/api/bank", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
				body: JSON.stringify({}),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpect)
			
			expect(code).toBe(400)
			expect(data).length(6)
		})
		
		it('ERROR Create data bank, name is empty', async () => {
			const test = structuredClone(dataTestBank)
			test.nama = ''
			const res = await fetch("http://localhost:3000/api/bank", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
				body: JSON.stringify(test),
			})
			const code = res.status
			const data = await res.json()
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpect)
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it('SUCCESS Create data bank use mock', async () => {
			const res = await fetch("http://localhost:3000/api/bank", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
				body: JSON.stringify(dataTestBank),
			})
			const code = res.status
			const data = await res.json()
			bankId = data.id
			console.log(data)
			expect(code).toBe(200)
			expect(data).toMatchObject(dataExpect)
			expect(data).toMatchObject(dataExpectType)
		})
	})
	
	describe("GET can get Data Bank", async () => {
		
		it('SUCCESS GET data bank all bank', async () => {
			const res = await fetch("http://localhost:3000/api/bank", {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).toBe(200)
			expect(data).toMatchObject({
				data: [dataExpectType],
				"page": expect.any(Number),
				"take": expect.any(Number)
				
			})
			expect(code).not.toBe(400)
			
		})
		
		it('SUCCESS GET data bank my id', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ bankId }`, {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).toBe(200)
			expect(data).toMatchObject(dataExpect)
			expect(code).not.toBe(400)
			
		})
		
		it('SUCCESS GET data bank. wrong id', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ 'not know' }`, {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectType)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
	})
	
	describe("PUT can create Data Bank", async () => {
		
		it('ERROR PUT data bank, not have token', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ 'woring id' }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ 'empty token' }`
				},
				body: JSON.stringify(dataTestBank),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectType)
			expect(code).toBe(400)
			expect(data).toBe("jwt malformed")
			
		})
		
		it('ERROR PUT data bank, wrong id', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ 'woring id' }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
				body: JSON.stringify(dataTestBank),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectType)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it('ERROR PUT data bank, data is has empty object', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ bankId }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
				body: JSON.stringify({}),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectType)
			expect(code).toBe(400)
			expect(code).toBe(400)
			
		})
		
		it('ERROR PUT data bank, data is has empty value', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ bankId }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
				body: JSON.stringify(dataTestBankEmpty),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectType)
			
			expect(code).toBe(400)
			expect(data).length(6)
		})
		
		it('ERROR PUT data bank, name is empty', async () => {
			const test = structuredClone(dataTestBank)
			test.nama = ''
			const res = await fetch(`http://localhost:3000/api/bank/${ bankId }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
				body: JSON.stringify(test),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectType)
			
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it('SUCCESS PUT data bank use mock', async () => {
			const test = structuredClone(dataTestBank)
			test.nama = 'name bank is updated'
			const res = await fetch(`http://localhost:3000/api/bank/${ bankId }`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
				body: JSON.stringify(test),
			})
			
			const testData: BankDB = {
				no: "084 2342 2342 4323",
				hp: "1231-2534-3454-2245",
				img: "http:image is noting",
				jenis: "Test Data",
				keterangan: "Is Test Data not for sell",
				lokasi: "this location not expose",
				nama: test.nama,
				userId: expect.any(String),
				id: expect.any(Number)
			}
			const code = res.status
			const data = await res.json()
			bankId = data.id
			expect(code).toBe(200)
			expect(data).toMatchObject(testData)
		})
	})
	
	describe("DELETE can create Data Bank", async () => {
		
		it('ERROR delete data bank. not have token', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ 'not know' }`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectType)
			console.log(data)
			expect(code).toBe(400)
			expect(data).toBe('Not have token in Bearer')
		})
		
		it('ERROR delete data bank. wrong id ', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ 'not know' }`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectType)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it('SUCCESS delete data bank.', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ bankId }`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).toBe(200)
			expect(data).toMatchObject(dataExpectType)
			expect(code).not.toBe(400)
		})
		
		it('ERROR delete data bank. data has deleted', async () => {
			const res = await fetch(`http://localhost:3000/api/bank/${ bankId }`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${ bankToken }`
				},
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectType)
			console.log(data)
			expect(code).toBe(400)
			expect(data).toBe('Data is Not Found maybe was been delete')
			
			bankFinish = true
		})
		
	})
})
