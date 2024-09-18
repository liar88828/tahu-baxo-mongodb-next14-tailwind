import { RegisterUser } from "@/interface/model/auth.type";

export const registerUserTransaction: RegisterUser = {
	fullname: "userTransaction",
	email: "userTransaction@gmail.com",
	password: "user1234",
	confPass: "user1234",
	phone: "081 1232 1234",
	address: "jln jakarta raya",
}

export const containId = (userId: string) => {
	return {
		where: {
			userId: {
				contains: userId
			}
		}
	}
}