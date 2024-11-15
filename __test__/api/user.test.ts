import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { config } from "@/config/baseConfig"
import { deleteUserTest } from "@/__test__/utils/registerData"
import { authRegisterExample } from "@/__test__/schema/auth.test";

let loginToken = ""
let registerToken = ""
let userIdData = ""
const loginData = {
	email: "userRegisterTest@gmail.com",
	password: "user1234",
}

export let userFinish = false

describe.skip(//.skipIf(userFinish === false)
	"Can Auth User Api", async () => {
		beforeAll(async () => {
			// 	const userDB = await prisma.user.findFirst({ where: { email: "loginUserTest@gmail.com" } })
			// 	if (userDB) {
			// 		const data = await prisma.user.create({
			// 			data: {
			// 				"name": "loginUserTest",
			// 				"email": "loginUserTest@gmail.com",
			// 				"password": "login123",
			// 				"phone": "081 1232 1234",
			// 				"address": "jln jakarta raya",
			// 				Trolley: {
			// 					create: {}
			// 				}
			// 			}
			// 		})
			// 	}
			//
			// //
			// 	const userDBRegister = await prisma.user.findFirst({ where: { email: "userRegisterTest@gmail.com" } })
			// 	if (userDBRegister) {
			// 		await deleteUserTest(registerToken)
			//
			// 	}
		})
		
		afterAll(async () => {
			// await deleteUserTest(loginToken)
			await deleteUserTest(registerToken)
		})
		
		describe("POST /api/user/register", async () => {
			it("ERROR registered user, because data is not complete all", async () => {
				const registerError = {
					fullname: "",
					email: "",
					password: "",
					confPass: "",
					phone: "",
					address: "",
				}
				
				const res = await fetch(`${ config.url }/api/user/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(registerError),
				})
				
				const code = res.status
				const data = await res.json()
				// console.log(data)
				expect(code).toBe(400)
				expect(code).not.toBe(200)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
				expect(data).toHaveLength(7)
			})
			
			it("ERROR registered user, because data is not complete name is not complete", async () => {
				const registerError = {
					fullname: "",
					email: "user5@gmail.com",
					password: "user1234",
					confPass: "user1234",
					phone: "081 1232 1234",
					address: "jln jakarta raya",
				}
				
				const res = await fetch(`${ config.url }/api/user/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(registerError),
				})
				
				const code = res.status
				const data = await res.json()
				// console.log(data)
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
				expect(data).toHaveLength(1)
			})
			
			it("ERROR registered user, because data is not complete name is not email is not match", async () => {
				const registerError = {
					fullname: "user10",
					email: "",
					password: "user1234",
					confPass: "user1234",
					phone: "081 1232 1234",
					address: "jln jakarta raya",
				}
				
				const res = await fetch(`${ config.url }/api/user/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(registerError),
				})
				
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
				expect(data).toHaveLength(2)
			})
			
			it("ERROR registered user, because data is not complete name is not password is less than 8", async () => {
				const registerError = {
					fullname: "user10",
					email: "user10@error.com",
					password: "",
					confPass: "",
					phone: "081 1232 1234",
					address: "jln jakarta raya",
				}
				
				const res = await fetch(`${ config.url }/api/user/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(registerError),
				})
				
				const code = res.status
				const data = await res.json()
				// console.log(data)
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
				expect(data).toHaveLength(2)
			})
			
			it("ERROR registered user, because data is not complete name is not password is not equal", async () => {
				const registerError = {
					fullname: "user10",
					email: "user10@error.com",
					password: "password",
					confPass: "password1234",
					phone: "081 1232 1234",
					address: "jln jakarta raya",
				}
				
				const res = await fetch(`${ config.url }/api/user/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(registerError),
				})
				
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
				expect(data).toBe("Password is not match")
				// expect(data).toHaveLength(2)
			})
			
			it("Successfully registered user", async () => {
				const res = await fetch(`${ config.url }/api/user/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(authRegisterExample),
				})
				
				const code = res.status
				const data = await res.json()
				console.log(data)
				registerToken = data.accessToken
				
				expect(code).toBe(200)
				expect(code).not.toBe(400)
				expect(data).toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(Object),
					data: expect.any(Object),
				})
			})
			
			it("ERROR registered user, because email is has registered", async () => {
				const res = await fetch(`${ config.url }/api/user/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(authRegisterExample),
				})
				
				const code = res.status
				const data = await res.json()
				// console.log(data)
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
				expect(data).toBe("Email is found used by userRegisterTest")
			})
		})
		
		describe("POST /api/user/login", async () => {
			it("ERROR login use api, email is not match", async () => {
				const loginData = {
					email: " ",
					password: "login123",
				}
				const res = await fetch(`${ config.url }/api/user/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(loginData),
				})
				
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
			})
			
			it("ERROR login use api, email is not found", async () => {
				const loginData = {
					email: " error@gmail.com",
					password: "login123",
				}
				const res = await fetch(`${ config.url }/api/user/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(loginData),
				})
				
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
			})
			
			it("ERROR login use api, password is empty", async () => {
				const loginData = {
					email: "loginUserTest@gmail.com",
					password: "",
				}
				const res = await fetch(`${ config.url }/api/user/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(loginData),
				})
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
			})
			
			it("ERROR login use api, password is not wrong", async () => {
				// const loginData = {
				// "email": "loginUserTest@gmail.com",
				// 	"password": "login123",
				// }
				const loginData = {
					email: "loginUserTest@gmail.com",
					password: "error123",
				}
				const res = await fetch(`${ config.url }/api/user/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(loginData),
				})
				
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).not.toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
					data: expect.any(Object),
				})
			})
			
			it("SUCCESS login use api", async () => {
				const res = await fetch(`${ config.url }/api/user/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(loginData),
				})
				
				const code = res.status
				const data = await res.json()
				
				console.log("----login test-----")
				console.log(data)
				console.log("-----login test----")
				
				expect(code).toBe(200)
				expect(data).toMatchObject({
					accessToken: expect.any(String),
					refreshToken: expect.any(Object),
					data: expect.any(Object),
				})
			})
		})
		
		describe.skip("DELETE /api/user/logout", async () => {
			it("Error logout use api, not have cookie", async () => {
				const loginData = {
					email: " ",
					password: "login123",
				}
				const res = await fetch(`${ config.url }/api/user/logout`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Set-Cookie": `token=${ "empty cookie" }`,
					},
					body: JSON.stringify(loginData),
				})
				
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).toBe("Not have token in Cookie")
			})
			
			it("SUCCESS logout use api ", async () => {
				const loginData = {
					email: " ",
					password: "login123",
				}
				const res = await fetch(`${ config.url }/api/user/logout`, {
					method: "DELETE",
					
					headers: {
						"Content-Type": "application/json",
						"Set-Cookie": `token=${ registerToken }`,
					},
					body: JSON.stringify(loginData),
				})
				
				const code = res.status
				const data = await res.json()
				
				console.log("----------")
				console.log(data)
				// console.log(data)
				console.log("----------")
				
				// expect(code).toBe(200)
				// expect(data).toBe('success logout')
			})
		})
		
		describe("GET /api/user/[id]", async () => {
			it("Error get user by id use api, not found id ", async () => {
				const res = await fetch(
					`${ config.url }/api/user/${ "cm0ndxr0r0000efi06nldn78y" }`,
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
				expect(code).toBe(400)
				expect(data).toBe("User is not found")
			})
			
			it("Error get user by id use api, id is number not string ", async () => {
				const res = await fetch(`${ config.url }/api/user/12345`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				
				const code = res.status
				const data = await res.json()
				expect(code).not.toBe(200)
				expect(code).toBe(400)
				expect(data).toHaveLength(1)
			})
			
			it("SUCCESS get user id use api ", async () => {
				const res = await fetch(`${ config.url }/api/user/${ userIdData }`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				const code = res.status
				const data = await res.json()
				console.log(data)
				expect(code).toBe(200)
				
				userFinish = true
			})
		})
	})
