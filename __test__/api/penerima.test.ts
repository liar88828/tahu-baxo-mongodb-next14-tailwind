import { afterAll, beforeAll, describe, expect, it } from "vitest"
import prisma from "@/config/prisma"
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData"
import { penerimaTransaction, testExpectPenerima, testPenerimaEmpty } from "@/assets/example/received";
import { containId } from "@/__test__/utils/auth";
import {
	apiCreateReceiver,
	apiDeleteReceiver,
	apiGetAllDataReceiver,
	apiGetReceiverId,
	apiUpdateReceiver
} from "@/server/api/receiver.api";

let penerimaToken = ""
let penerimaId = 0
let userId = ''


describe.skip("can test api penerima", async () => {
	beforeAll(async () => {
		const { accessToken, data } = await registerTest('penerima')
		penerimaToken = accessToken
		userId = data.id
	})
	afterAll(async () => {
		
		await prisma.receiverDB.deleteMany(containId(userId))
		await deleteUserTest(penerimaToken)
	})
	
	describe("POST can create Data Penerima", async () => {
		it("ERROR Create data penerima, not have token", async () => {
			const { data, code } = await apiCreateReceiver(penerimaTransaction, "empty token")
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
		})
		
		it("ERROR Create data penerima, is empty", async () => {
			// @ts-ignore
			const { data, code } = await apiCreateReceiver({}, penerimaToken)
			
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).length(3)
		})
		
		it("ERROR Create data penerima, name is empty", async () => {
			const test = structuredClone(penerimaTransaction)
			test.name = ""
			const { data, code } = await apiCreateReceiver(test, penerimaToken)
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it("SUCCESS Create data penerima use mock", async () => {
			const { data, code } = await apiCreateReceiver(penerimaTransaction, penerimaToken)
			penerimaId = data.id
			
			expect(code).toBe(200)
			expect(data).toMatchObject(testExpectPenerima)
			expect(data).toMatchObject(testExpectPenerima)
		})
	})
	
	describe("GET can get Data Penerima", async () => {
		it("SUCCESS GET data penerima all penerima", async () => {
			const { code, data } = await apiGetAllDataReceiver('');
			
			expect(code).toBe(200)
			expect(data).toMatchObject({
				data: [testExpectPenerima],
				page: expect.any(Number),
				take: expect.any(Number),
			})
			expect(code).not.toBe(400)
		})
		
		it("SUCCESS GET data penerima my id", async () => {
			const { data, code } = await apiGetReceiverId(penerimaId)
			
			expect(code).toBe(200)
			expect(data).toMatchObject(testExpectPenerima)
			expect(code).not.toBe(400)
		})
		
		it("SUCCESS GET data penerima. wrong id", async () => {
			// @ts-ignore
			const { data, code } = await apiGetReceiverId("not know")
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
	})
	
	describe("PUT can update Data Penerima", async () => {
		
		it("ERROR PUT data penerima, not have token", async () => {
			// @ts-ignore
			const { data, code } = await apiUpdateReceiver(penerimaId, penerimaTransaction, "not token")
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toBe("Invalid Compact JWS")
		})
		
		it("ERROR PUT data penerima, wrong id", async () => {
			// @ts-ignore
			const { data, code } = await apiUpdateReceiver("penerimaId", penerimaTransaction, penerimaToken)
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it("ERROR PUT data penerima, data is has empty object", async () => {
			// @ts-ignore
			const { data, code } = await apiUpdateReceiver(penerimaId, {}, penerimaToken)
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(code).toBe(400)
		})
		
		it("ERROR PUT data penerima, data is has empty value", async () => {
			const { data, code } = await apiUpdateReceiver(penerimaId, testPenerimaEmpty, penerimaToken)
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).length(3)
		})
		
		it("ERROR PUT data penerima, name is empty", async () => {
			const test = structuredClone(penerimaTransaction)
			test.name = ""
			const { data, code } = await apiUpdateReceiver(penerimaId, test, penerimaToken)
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it("SUCCESS PUT data penerima use mock", async () => {
			const test = structuredClone(penerimaTransaction)
			test.name = "name penerima is updated"
			const { data, code } = await apiUpdateReceiver(penerimaId, test, penerimaToken)
			
			expect(code).toBe(200)
			expect(data).toMatchObject(testExpectPenerima)
		})
	})
	
	describe("DELETE can create Data Penerima", async () => {
		it("ERROR delete data penerima. not have token / empty", async () => {
			const { data, code } = await apiDeleteReceiver(penerimaId, 'no token')
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toBe("Invalid Compact JWS")
		})
		
		it("ERROR delete data penerima. wrong id ", async () => {
			// @ts-ignore
			const { data, code } = await apiDeleteReceiver("not know", penerimaToken)
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it("SUCCESS delete data penerima.", async () => {
			const { data, code } = await apiDeleteReceiver(penerimaId, penerimaToken)
			
			expect(code).toBe(200)
			expect(data).toMatchObject(testExpectPenerima)
			expect(code).not.toBe(400)
		})
		
		it("ERROR delete data penerima. data has deleted", async () => {
			const { data, code } = await apiDeleteReceiver(penerimaId, penerimaToken)
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(testExpectPenerima)
			expect(code).toBe(400)
			expect(data).toBe("Data is Not Found maybe was been delete")
		})
	})
})
