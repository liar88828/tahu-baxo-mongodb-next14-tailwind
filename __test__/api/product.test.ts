import { afterAll, beforeAll, describe, expect, it } from "vitest"
import prisma from "@/config/prisma"
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData"
import { dataTestProduct, dataTestProductEmpty, expectationProduct } from "@/assets/example/product";

let productToken = ""
let productId = 0

describe.skip
	//.skipIf(false)
	("can test api product", async () => {
		beforeAll(async () => {
			const { data, accessToken } = await registerTest('product')
			productToken = accessToken
			dataTestProduct.userId = data.id
		})
		afterAll(async () => {
			await prisma.productDB.deleteMany()
			await deleteUserTest(productToken)
		})
		
		describe("POST can create Data Product", async () => {
			it("ERROR Create data product, not have token", async () => {
				const res = await fetch("http://localhost:3000/api/product", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ "empty token" }`,
					},
					body: JSON.stringify(dataTestProduct),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				expect(code).toBe(400)
				expect(code).toBe(400)
			})
			
			it("ERROR Create data product, is empty", async () => {
				const res = await fetch("http://localhost:3000/api/product", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ productToken }`,
					},
					body: JSON.stringify({}),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				expect(code).toBe(400)
				expect(data).length(6)
			})
			
			it("ERROR Create data product, name is empty", async () => {
				const test = structuredClone(dataTestProduct)
				test.name = ""
				const res = await fetch("http://localhost:3000/api/product", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ productToken }`,
					},
					body: JSON.stringify(test),
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				expect(code).toBe(400)
				expect(data).length(1)
			})
			
			it("SUCCESS Create data product use mock", async () => {
				const res = await fetch("http://localhost:3000/api/product", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${ productToken }`,
					},
					body: JSON.stringify(dataTestProduct),
				})
				const code = res.status
				const data = await res.json()
				productId = data.id
				// console.log(data)
				
				expect(code).toBe(200)
				expect(data).toMatchObject(expectationProduct)
			})
		})
		
		describe("GET can get Data Product", async () => {
			it("SUCCESS GET data product all product", async () => {
				const res = await fetch("http://localhost:3000/api/product", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				const code = res.status
				const data = await res.json()
				
				expect(code).toBe(200)
				expect(data).toMatchObject({
					data: [expectationProduct],
					page: expect.any(Number),
					take: expect.any(Number),
				})
				expect(code).not.toBe(400)
			})
			
			it("SUCCESS GET data product my id", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ productId }`,
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
				expect(data).toMatchObject(expectationProduct)
				expect(code).not.toBe(400)
			})
			
			it("SUCCESS GET data product. wrong id", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ "not know" }`,
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
				expect(data).not.toMatchObject(expectationProduct)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
		})
		
		describe("PUT can create Data Product", async () => {
			
			it("ERROR PUT data product, wrong id", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ "woring id" }`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${ productToken }`,
						},
						body: JSON.stringify(dataTestProduct),
					}
				)
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
			it("ERROR PUT data product, not have token", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ 1 }`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${ 'not have token' }`,
						},
						body: JSON.stringify(dataTestProduct),
					}
				)
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				expect(code).toBe(400)
				expect(data).toBe("Invalid Compact JWS")
			})
			
			it("ERROR PUT data product, data is has empty object", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ productId }`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${ productToken }`,
						},
						body: JSON.stringify({}),
					}
				)
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				expect(code).toBe(400)
				expect(code).toBe(400)
			})
			
			it("ERROR PUT data product, data is has empty value", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ productId }`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${ productToken }`,
						},
						body: JSON.stringify(dataTestProductEmpty),
					}
				)
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				
				expect(code).toBe(400)
				expect(data).length(4)
			})
			
			it("ERROR PUT data product, name is empty", async () => {
				const test = structuredClone(dataTestProduct)
				test.name = ""
				const res = await fetch(
					`http://localhost:3000/api/product/${ productId }`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${ productToken }`,
						},
						body: JSON.stringify(test),
					}
				)
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				expect(code).toBe(400)
				expect(data).length(1)
			})
			
			it("SUCCESS PUT data product use mock", async () => {
				const test = structuredClone(dataTestProduct)
				test.name = "name product is updated"
				const res = await fetch(
					`http://localhost:3000/api/product/${ productId }`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${ productToken }`,
						},
						body: JSON.stringify(test),
					}
				)
				const code = res.status
				const data = await res.json()
				productId = data.id
				expect(code).toBe(200)
				expect(data).toMatchObject(expectationProduct)
			})
		})
		describe("DELETE can create Data Product", async () => {
			it("ERROR delete data product. not have token", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ "not know" }`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				console.log(data)
				expect(code).toBe(400)
				expect(data).toBe("Not have token in Bearer")
			})
			
			it("ERROR delete data product. wrong id ", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ "not know" }`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${ productToken }`,
						},
					}
				)
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
			it("SUCCESS delete data product.", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ productId }`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${ productToken }`,
						},
					}
				)
				const code = res.status
				const data = await res.json()
				
				expect(code).toBe(200)
				expect(data).toMatchObject(expectationProduct)
				expect(code).not.toBe(400)
			})
			
			it("ERROR delete data product. data has deleted", async () => {
				const res = await fetch(
					`http://localhost:3000/api/product/${ productId }`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${ productToken }`,
						},
					}
				)
				const code = res.status
				const data = await res.json()
				
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject(expectationProduct)
				console.log(data)
				expect(code).toBe(400)
				expect(data).toBe("Data is Not Found maybe was been delete")
			})
		})
	})
