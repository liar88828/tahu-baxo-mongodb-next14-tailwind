import { testApiHandler } from "next-test-api-route-handler";
import { afterAll, beforeAll, describe, expect, it, } from 'vitest';
import prisma from "@/config/prisma";
import * as appHandler from "../../app/api/bank/route"
import * as appHandlerParam from "../../app/api/bank/[id]/route";
import { BankDB, User } from "@prisma/client";
import { dataTestCreate, } from "@/assets/example/bank";
import { dataTestError, dataTestUpdate } from "@/__test__/utils/bank";

describe.skip('can test controller bank', async () => {
	beforeAll(async (context) => {
		const data = await prisma.user.create({
			data: {
				name: "userTransaction",
				email: "userTransaction@gmail.com",
				password: "user1234",
				phone: "081 1232 1234",
				address: "jln jakarta raya",
			}
		})
		//@ts-ignore
		context.user = data
	})
	afterAll(async () => {
		await prisma.bankDB.deleteMany()
	})
	describe.sequential("POST can create Data Bank", async () => {
		
		it("SUCCESS Create data bank use mock", async ({ user }: { user: User }) => {
			dataTestCreate.userId = user.id
			await testApiHandler({
				appHandler,
				test: async ({ fetch }) => {
					const response = await fetch({
						method: "POST",
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(dataTestCreate),
					});
					const json = await response.json();
					expect(response.status).toBe(200);
					expect(json).toMatchObject(dataTestCreate);
				},
			});
		})
	})
	
	describe("GET can find data Bank", async () => {
		
		it("SUCCESS GET can get data bank use mock", async () => {
			await testApiHandler({
				appHandler,
				test: async ({ fetch }) => {
					const response = await fetch({ method: "GET" });
					const json = await response.json();
					expect(response.status).toBe(200);
					expect(json).toMatchObject([dataTestCreate]);
				},
			});
		});
		
		it("SUCCESS GET can get data bank by id  data use mock", async () => {
			const { id } = await prisma.bankDB.findFirst() as BankDB
			await testApiHandler({
				params: { id: `${ id }` },
				appHandler: appHandlerParam,
				test: async ({ fetch }) => {
					const response = await fetch({ method: "GET" });
					const json = await response.json();
					expect(response.status).toBe(200);
					expect(json).toMatchObject(dataTestCreate);
				},
			});
		});
		
		it("ERROR GET can get data bank by id  data use mock, because wrong id ", async () => {
			await testApiHandler({
				params: { id: `wrong` },
				appHandler: appHandlerParam,
				test: async ({ fetch }) => {
					const response = await fetch({ method: "GET" });
					const json = await response.json();
					expect(response.status).toBe(400);
					expect(json).not.toMatchObject(dataTestCreate);
				},
			});
		});
		
	})
	
	describe("UPDATE can Update data Bank", async () => {
		
		it("SUCCESS can update data bank by id  data use mock", async () => {
			const { id } = await prisma.bankDB.findFirst() as BankDB
			await testApiHandler({
				params: { id: `${ id }` },
				appHandler: appHandlerParam,
				test: async ({ fetch }) => {
					const response = await fetch({
						method: "PUT",
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(dataTestUpdate),
					});
					const json = await response.json();
					expect(response.status).toBe(200);
					expect(json).toMatchObject(dataTestUpdate);
				},
			});
		});
		
		it("ERROR can update data bank by id data use mock, because wrong id", async () => {
			await testApiHandler({
				params: { id: `wrong` },
				appHandler: appHandlerParam,
				test: async ({ fetch }) => {
					const response = await fetch({
						method: "PUT",
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(dataTestUpdate),
					});
					const json = await response.json();
					expect(response.status).toBe(400);
					expect(json).not.toMatchObject(dataTestUpdate);
				},
			});
		});
		
		it("ERROR can update data bank by id data use mock, because wrong data", async () => {
			
			await testApiHandler({
				params: { id: `wrong` },
				appHandler: appHandlerParam,
				test: async ({ fetch }) => {
					const response = await fetch({
						method: "PUT",
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(dataTestError),
					});
					const json = await response.json();
					expect(response.status).toBe(400);
					expect(json).not.toMatchObject(dataTestUpdate);
				},
			});
		});
	})
	
	describe("DELETE can Update data Bank", async () => {
		it("SUCCESS can delete data bank by id  data use mock", async () => {
			const { id } = await prisma.bankDB.findFirst() as BankDB
			await testApiHandler({
				params: { id: `${ id }` },
				appHandler: appHandlerParam,
				test: async ({ fetch }) => {
					const response = await fetch({
						method: "DELETE",
					});
					const json = await response.json();
					expect(response.status).toBe(200);
					expect(json).toMatchObject(dataTestUpdate);
				},
			});
		});
		
		it("ERROR can delete data bank by id  data use mock, because has deleted", async () => {
			const { id } = await prisma.bankDB.findFirst() as BankDB
			await testApiHandler({
				params: { id: `${ id }` },
				appHandler: appHandlerParam,
				test: async ({ fetch }) => {
					const response = await fetch({
						method: "DELETE",
					});
					const json = await response.json();
					expect(response.status).toBe(200);
					expect(json).not.toMatchObject(dataTestUpdate);
				},
			});
		});
		
	})
})
