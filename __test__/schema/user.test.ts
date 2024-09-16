import { describe, expect, it } from "vitest";
import { userSchema } from "@/server/schema/user.schema";
import { loginTest, registerTest, updateTest } from "@/assets/example/user";

describe('can test User schema', async () => {
	
	describe("test zod login schema", () => {
		it("can validate login data", async () => {
			async function testFun() {
				try {
					return userSchema.loginValid(loginTest)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(loginTest)
			expect(testData).toEqual(loginTest)
		})
	})
	
	describe("test zod update schema", () => {
		it("can validate user data", async () => {
			async function testFun() {
				try {
					return userSchema.updateValid(updateTest)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(updateTest)
			expect(testData).toEqual(updateTest)
		})
	})
	
	describe("test zod register schema", () => {
		it("can validate user data", async () => {
			async function testFun() {
				try {
					return userSchema.registerValid(registerTest)
				} catch (e) {
					console.log(e)
				}
			}
			
			const testData = await testFun()
			expect(testData).toStrictEqual(registerTest)
			expect(testData).toEqual(registerTest)
		})
	})
	
})
