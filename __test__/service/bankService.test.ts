import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { bankService } from "@/server/service/bank.service";
import { dataExpectTypeDB, dataTestCreate, } from "@/assets/example/bank";
import { createUser } from "@/__test__/utils/createUser";
import prisma from "@/config/prisma";

let userID = ''
let bankID = 0

describe('test bank service', async () => {
	beforeAll(async () => {
		const user = await createUser()
		userID = user.id
	})
	
	afterAll(async () => {
		await prisma.$transaction(async (tx) => {
			await tx.bankDB.deleteMany({
				where: {
					userId: {
						contains: userID
					}
				}
			})
		})
		await prisma.user.delete({ where: { id: userID }, })
	})
	
	describe('CREATE', () => {
		it('can validate createOne ', async () => {
			
			const test = structuredClone(dataTestCreate)
			test.userId = userID
			const testData = async () => {
				return bankService.createOne(test);
			}
			const data = await testData()
			// ------- get data
			bankID = data.id
			// ------- get data
			
			expect(data).toMatchObject(test)
			expect(data).toMatchObject(dataExpectTypeDB)
		})
	})
	
	describe('GET', () => {
		
		it('can validate find one ', async () => {
			function funTest() {
				return () => bankService.findOne(1);
			}
			
			const testData = () => {
				return bankService.findOne(1);
			}
			
			expect(() => bankService.findOne(1)).toThrowError(/^Method not implemented.$/)
			expect(() => bankService.findOne(1)).toThrowError('Method not implemented')
			expect(funTest()).toThrowError('Method not implemented')
			expect(testData).toThrowError('Method not implemented')
		})
		
		it('can validate find one Public ', async () => {
			const testData = () => {
				return bankService.findAllPublic({
					take: 1,
					category: 'electric',
					page: 1,
					search: ""
				});
			}
			
			expect(testData).toThrowError(/^Method not implemented.$/)
			expect(testData).toThrowError('Method not implemented')
			expect(testData).toThrowError('Method not implemented')
			expect(testData).toThrowError('Method not implemented')
		})
		
	})
	
	describe('UPDATE', () => {
		it('can validate updateOne ', async () => {
			
			const test = structuredClone(dataTestCreate)
			test.userId = userID
			test.name = 'name is update'
			const testData = async () => {
				return bankService.updateOne({
					id_bank: bankID,
					id_user: userID
				}, test);
			}
			
			const data = await testData()
			expect(data).toMatchObject(test)
			expect(data).toMatchObject(dataExpectTypeDB)
		})
	})
	
	describe('Delete', () => {
		it('can validate deleteOne ', async () => {
			
			const test = structuredClone(dataTestCreate)
			test.userId = userID
			test.name = 'name is update'
			const testData = async () => {
				return bankService.deleteOne({
					id_bank: bankID,
					id_user: userID
				},);
			}
			
			const data = await testData()
			expect(data).toMatchObject(test)
			expect(data).toMatchObject(dataExpectTypeDB)
		})
	})
	
})
