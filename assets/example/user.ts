import { LoginSchema, RegisterSchema, UpdateSchema } from "@/interface/model/auth.type";

export const loginTest: LoginSchema = {
	email: "test@example.com",
	password: "12345678",
}
export const updateTest: UpdateSchema = {
	id: "cm0ray6cb0001rsx0eaaiat90",
	name: "user1234",
	email: "user1@gmail.com",
	image: "http://test.image.com",
	role: "USER",
}

export const registerTest: RegisterSchema = {
	fullname: "user1234",
	email: "user1@gmail.com",
	password: "12345678",
	confPass: "12345678",
	address: "jl jakarta raya",
	phone: '081 1232 1234',
}