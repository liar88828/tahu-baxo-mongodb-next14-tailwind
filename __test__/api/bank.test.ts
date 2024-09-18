import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import prisma from "@/config/prisma";
import { deleteUserTest, registerTest } from "@/__test__/utils/registerData";
import { bankDataList, dataExpectTypeDB, dataTestBankEmpty } from "@/assets/example/bank";
import { apiGetBankAll, apiGetBankId, createBank, deleteBank, updateBank } from "@/server/api/bank.api";
import { containId } from "@/__test__/utils/auth";

let bankToken = ''
let bankId = 0
let userId = ''

export let bankFinish = false
const dataTestBank = bankDataList[0]

describe('can test api bank', async () => {
	beforeAll(async () => {
		const { data, accessToken } = await registerTest('bank');
		bankToken = accessToken
		dataTestBank.userId = data.id
		userId = data.id
		
	})
	afterAll(async () => {
		await prisma.bankDB.deleteMany(containId(userId))
		await deleteUserTest(bankToken)
	})
	
	describe("POST can create Data Bank", async () => {
		it('ERROR Create data bank, not have token', async () => {
			const { data, code } = await createBank(dataTestBank, 'empty token',);
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(code).toBe(400)
			
		})
		
		it('ERROR Create data bank, is empty', async () => {
			// @ts-ignore
			const { data, code } = await createBank({}, bankToken,);
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).length(6)
		})
		
		it('ERROR Create data bank, name is empty', async () => {
			const test = structuredClone(dataTestBank)
			test.name = ''
			const { data, code } = await createBank(test, bankToken,);
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it('SUCCESS Create data bank use mock', async () => {
			const { data, code } = await createBank(dataTestBank, bankToken,);
			
			bankId = data.id
			expect(code).toBe(200)
			expect(data).toMatchObject(dataExpectTypeDB)
		})
	})
	
	describe("GET can get Data Bank", async () => {
		
		it('SUCCESS GET data bank all bank', async () => {
			const { data, code } = await apiGetBankAll();
			
			expect(code).toBe(200)
			expect(data).toMatchObject({
				data: [dataExpectTypeDB],
				"page": expect.any(Number),
				"take": expect.any(Number)
				
			})
			expect(code).not.toBe(400)
			
		})
		
		it('SUCCESS GET data bank my id', async () => {
			const { data, code } = await apiGetBankId(bankId);
			
			expect(code).toBe(200)
			expect(data).toMatchObject(dataExpectTypeDB)
			expect(code).not.toBe(400)
			
		})
		
		it('ERROR GET data bank. wrong id', async () => {
			// @ts-ignore
			const { data, code } = await apiGetBankId('wrong id ');
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
	})
	
	describe("PUT can create Data Bank", async () => {
		it('ERROR PUT data bank, not have token', async () => {
			const { data, code } = await updateBank(1, dataTestBank, 'empty token')
			
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).toBe("Invalid Compact JWS")
			
		})
		
		it('ERROR PUT data bank, wrong id', async () => {
			// @ts-ignore
			const { data, code } = await updateBank('woring id', dataTestBank, bankToken)
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it('ERROR PUT data bank, data is has empty object', async () => {
			// @ts-ignore
			const { data, code } = await updateBank(bankId, {}, bankToken)
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(code).toBe(400)
			
		})
		
		it('ERROR PUT data bank, data is has empty value', async () => {
			const { data, code } = await updateBank(bankId, dataTestBankEmpty, bankToken)
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).length(6)
		})
		
		it('ERROR PUT data bank, name is empty', async () => {
			const test = structuredClone(dataTestBank)
			test.name = ''
			const { data, code } = await updateBank(bankId, test, bankToken)
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).length(1)
		})
		
		it('SUCCESS PUT data bank use mock', async () => {
			const test = structuredClone(dataTestBank)
			test.name = 'name bank is updated'
			const { data, code } = await updateBank(bankId, test, bankToken);
			bankId = data.id
			expect(code).toBe(200)
			expect(data).toMatchObject(dataExpectTypeDB)
		})
	})
	
	describe("DELETE can create Data Bank", async () => {
		
		it('ERROR delete data bank. not have token', async () => {
			//@ts-ignore
			const { data, code } = await deleteBank(bankId, 'not token')
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).toBe('Not have token in Bearer')
		})
		
		it('ERROR delete data bank. wrong id ', async () => {
			//@ts-ignore
			const { data, code } = await deleteBank('not know', bankToken)
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).toHaveLength(1)
		})
		
		it('SUCCESS delete data bank.', async () => {
			const { code, data } = await deleteBank(bankId, bankToken);
			expect(code).toBe(200)
			expect(data).toMatchObject(dataExpectTypeDB)
			expect(code).not.toBe(400)
		})
		
		it('ERROR delete data bank. data has deleted', async () => {
			const { code, data } = await deleteBank(bankId, bankToken);
			expect(code).not.toBe(200)
			expect(data).not.toMatchObject(dataExpectTypeDB)
			expect(code).toBe(400)
			expect(data).toBe('Data is Not Found maybe was been delete')
			
			bankFinish = true
		})
		
	})
})
