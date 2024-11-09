import { z } from "zod";
import { AccessUserID } from "@/server/service/auth/jwt.service";

export const phoneInit = z.string({ required_error: 'Number Phone is required', }).min(2).max(30)
export const imageInit = z.string({ required_error: 'Img is required', }).max(200).optional().nullable()
export const addressInit = z.string({ required_error: 'Address is required', }).min(2).max(100)
export const descriptionInit = z.string({ required_error: 'Description is required', }).min(2).max(300)
export const nameInit = z.string({ required_error: 'Name is required', }).min(2).max(30)
export const userId = z.string({ required_error: 'User is required' }).cuid()
export const priceInit = z.number({ required_error: "Price is required" })
	.min(1)
	.nonnegative()
export const qtyInit = z
	.number({ required_error: "Quantity is required" }).min(1)
	.int()
	.nonnegative()
export const typeInit = z.string({ required_error: "Type is required" }).min(1).max(100)

export const validIdNum = (id: number) => z.number().parse(id)
export const validUserId = (id: AccessUserID) => z.object({
	id: userId
}).parse(id)

