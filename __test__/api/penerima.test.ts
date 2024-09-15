import { afterAll, beforeAll, describe, expect, it } from "vitest"
import prisma from "@/config/prisma"
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData"
import { penerimaTransaction, testExpectPenerima, testPenerimaEmpty } from "@/assets/example/received";
import { getAllDataReceiver } from "@/server/action/receiver.action";

let penerimaToken = ""
let penerimaId = 0

describe("can test api penerima", async () => {
	beforeAll(async () => {
		const { accessToken, data } = await registerTest('penerima')
		penerimaToken = accessToken
		
	})
	afterAll(async () => {
		await prisma.receiverDB.deleteMany()
		await deleteUserTest(penerimaToken)
	})
	
	describe("POST can create Data Penerima", async () => {
		it("ERROR Create data penerima, not have token", async () => {
			const res = await fetch("http://localhost:3000/api/penerima", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ "empty token" }`,
				},
				body: JSON.stringify(penerimaTransaction),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
		})
		
		it("ERROR Create data penerima, is empty", async () => {
			const res = await fetch("http://localhost:3000/api/penerima", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ penerimaToken }`,
				},
				body: JSON.stringify({}),
			})
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			
			expect(code).toBe(400)
			expect(data).length(3)
		})
		
		it("ERROR Create data penerima, name is empty", async () => {
			const test = structuredClone(penerimaTransaction)
			test.name = ""
			const res = await fetch("http://localhost:3000/api/penerima", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ penerimaToken }`,
				},
				body: JSON.stringify(test),
			})
			const code = res.status
			const data = await res.json()
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it("SUCCESS Create data penerima use mock", async () => {
			const res = await fetch("http://localhost:3000/api/penerima", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ penerimaToken }`,
				},
				body: JSON.stringify(penerimaTransaction),
			})
			const code = res.status
			const data = await res.json()
			penerimaId = data.id
			console.log(data)
			expect(code).toBe(200)
			expect(data).toMatchObject(testExpectPenerima)
			expect(data).toMatchObject(testExpectPenerima)
		})
	})
	
	describe("GET can get Data Penerima", async () => {
		it("SUCCESS GET data penerima all penerima", async () => {
			const fun = async () => {
				const res = await getAllDataReceiver('');
				if (!res) {
					throw null
				}
				return res
			}
			const res = await fun()
			
			expect(res.code).toBe(200)
			expect(res.data).toMatchObject({
				data: [testExpectPenerima],
				page: expect.any(Number),
				take: expect.any(Number),
			})
			expect(res.code).not.toBe(400)
		})
		
		it("SUCCESS GET data penerima my id", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ penerimaId }`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).toBe(200)
			expect(data).toMatchObject(testExpectPenerima)
			expect(code).not.toBe(400)
		})
		
		it("SUCCESS GET data penerima. wrong id", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ "not know" }`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
	})
	
	describe("PUT can create Data Penerima", async () => {
		it("ERROR PUT data penerima, not have token", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ "woring id" }`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ "empty token" }`,
					},
					body: JSON.stringify(penerimaTransaction),
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toBe("Invalid Compact JWS")
		})
		
		it("ERROR PUT data penerima, wrong id", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ "woring id" }`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ penerimaToken }`,
					},
					body: JSON.stringify(penerimaTransaction),
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it("ERROR PUT data penerima, data is has empty object", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ penerimaId }`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ penerimaToken }`,
					},
					body: JSON.stringify({}),
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(code).toBe(400)
		})
		
		it("ERROR PUT data penerima, data is has empty value", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ penerimaId }`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ penerimaToken }`,
					},
					body: JSON.stringify(testPenerimaEmpty),
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			
			expect(code).toBe(400)
			expect(data).length(3)
		})
		
		it("ERROR PUT data penerima, name is empty", async () => {
			const test = structuredClone(penerimaTransaction)
			test.name = ""
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ penerimaId }`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ penerimaToken }`,
					},
					body: JSON.stringify(test),
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it("SUCCESS PUT data penerima use mock", async () => {
			const test = structuredClone(penerimaTransaction)
			test.name = "name penerima is updated"
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ penerimaId }`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ penerimaToken }`,
					},
					body: JSON.stringify(test),
				}
			)
			
			const code = res.status
			const data = await res.json()
			penerimaId = data.id
			expect(code).toBe(200)
			expect(data).toMatchObject(testExpectPenerima)
		})
	})
	
	describe("DELETE can create Data Penerima", async () => {
		it("ERROR delete data penerima. not have token / empty", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ "not know" }`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ "asdasdasd" }`,
					},
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toBe("Invalid Compact JWS")
		})
		
		it("ERROR delete data penerima. wrong id ", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ "not know" }`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ penerimaToken }`,
					},
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it("SUCCESS delete data penerima.", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ penerimaId }`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ penerimaToken }`,
					},
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).toBe(200)
			expect(data).toMatchObject(testExpectPenerima)
			expect(code).not.toBe(400)
		})
		
		it("ERROR delete data penerima. data has deleted", async () => {
			const res = await fetch(
				`http://localhost:3000/api/penerima/${ penerimaId }`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ penerimaToken }`,
					},
				}
			)
			const code = res.status
			const data = await res.json()
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			console.log(data)
			expect(code).toBe(400)
			expect(data).toBe("Data is Not Found maybe was been delete")
		})
	})
})
