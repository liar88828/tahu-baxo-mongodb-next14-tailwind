import { DeliveryDB, Prisma, User } from "@prisma/client";
import prisma from "@/config/prisma";
import { deliverySchema } from "@/server/schema/deliver.schema";
import { z } from "zod";
//
export type DeliveryCreatePrisma = Prisma.Args<
	typeof prisma.deliveryDB,
	'create'
>['data']
export type DeliveryUpdatePrisma = Prisma.Args<
	typeof prisma.deliveryDB,
	'update'
>['data']
//
export type DeliveryId = {
	id_delivery: DeliveryDB['id'],
	id_user: User['id']
}
//
export type DeliveryCreate = z.output<typeof deliverySchema.create>
export type DeliveryUpdate = z.output<typeof deliverySchema.update>
//
export type DeliveryCreateFormError = z.inferFlattenedErrors<typeof deliverySchema.create>['fieldErrors'];
//
export type DeliveryCreateKey = Record<keyof DeliveryCreate, any>
export type DeliveryUpdateKey = Record<keyof DeliveryUpdate, any>
