import type { Prisma } from "@prisma/client"
import type { orderSchema } from "../../server/schema/order.schema"
import type prisma from "../../config/prisma"
import type { z } from "zod"

export type OrderDBCreate = Prisma.Args<
	typeof prisma.orderanDB,
	"create"
>["data"]

export type OrderCreate = z.infer<typeof orderSchema.create>
