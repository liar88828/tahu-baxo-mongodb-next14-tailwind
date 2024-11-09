import { describe, expect, it } from "vitest";
import { userSchema } from "@/server/schema/user.schema";
import { z } from "zod";

export const authRegisterExample = {
	fullname: "userRegisterTest",
	email: "userRegisterTest@gmail.com",
	password: "user1234",
	confPass: "user1234",
	phone: "081 1232 1234",
	address: "jln jakarta raya",
}

const authLoginExample = {
	email: "userLoginTest@gmail.com",
	password: "user1234",
}

describe('can validate data for auth', () => {
	
	describe('can test register schema', () => {
		
		it('ERROR cannot register data, data is not complete', () => {
			function testFun() {
				try {
					return userSchema.registerValid({
						email: "",
						password: "",
						confPass: "",
						phone: "",
						address: "",
						fullname: ''
					})
					
				} catch (e) {
					console.log(e)
				}
				
			}
			
			expect(testFun()).not.toStrictEqual(authRegisterExample)
		})
		
		it('ERROR cannot register data, data is email is not complete', () => {
			function testFun() {
				try {
					return userSchema.registerValid({
						email: "",
						password: "12345678",
						confPass: "12345678",
						phone: "082 1234 1234",
						address: "jl jakarta raya",
						fullname: 'user test 1'
					})
					
				} catch (e) {
					console.log(e)
				}
				
			}
			
			expect(testFun()).not.toStrictEqual(authRegisterExample)
		})
		
		it('ERROR cannot register data, data is password is not match', () => {
			function testFun() {
				try {
					return userSchema.registerValid({
						email: "user1@gmail.com",
						password: "1234567",
						confPass: "12345678",
						phone: "082 1234 1234",
						address: "jl jakarta raya",
						fullname: 'user test 1'
					})
					
				} catch (e) {
					console.log(e)
				}
				
			}
			
			expect(testFun()).not.toStrictEqual(authRegisterExample)
		})
		
		it('SUCCESS can register data', () => {
			function testFun() {
				try {
					return userSchema.registerValid(authRegisterExample,)
					
				} catch (e) {
					console.log(e)
				}
				
			}
			
			expect(testFun()).toStrictEqual(authRegisterExample)
		})
		
	})
	describe('can test login schema', () => {
		
		it('ERROR cannot login data, data is empty', () => {
			const testFun = () => {
				try {
					return userSchema.loginValid({
						email: "",
						password: ""
					})
				} catch (e) {
					if (e instanceof z.ZodError) {
						return e.flatten().formErrors
					}
				}
				
			}
			expect(testFun()).toMatchObject([])
			expect(testFun()).not.toStrictEqual(authLoginExample)
		})
		
		it('ERROR cannot login data, email is not valid', () => {
			const testFun = () => {
				try {
					return userSchema.loginValid({
						email: "emailasdasda",
						password: "12345678"
					})
				} catch (e) {
					if (e instanceof z.ZodError) {
						return e.flatten().formErrors
					}
				}
				
			}
			expect(testFun()).toMatchObject([])
			expect(testFun()).not.toStrictEqual(authLoginExample)
		})
		
		it('ERROR cannot login data, email is not valid', () => {
			const testFun = () => {
				try {
					return userSchema.loginValid({
						email: "email@gmail.com",
						password: "1234567"
					})
				} catch (e) {
					if (e instanceof z.ZodError) {
						return e.flatten().formErrors
					}
				}
				
			}
			expect(testFun()).toMatchObject([])
			expect(testFun()).not.toStrictEqual(authLoginExample)
		})
		
		it('SUCCESS can login data', () => {
			function testFun() {
				try {
					return userSchema.loginValid(authLoginExample)
				} catch (e) {
					console.log(e)
					return e
				}
				
			}
			
			expect(testFun()).toStrictEqual(authLoginExample)
			expect(testFun()).toMatchObject(authLoginExample)
		})
	})
})
