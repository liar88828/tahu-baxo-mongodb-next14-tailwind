import prisma from "@/config/prisma";

export const createUser = async () => {
	return prisma.user.create({
		data: {
			name: "userTest",
			email: "userTransaction@gmail.com",
			password: "user1234",
			phone: "081 1232 1234",
			address: "jln jakarta raya",
		}
	})
}