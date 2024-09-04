import { DeliveryDB, Prisma, User } from "@prisma/client";
import prisma from "@/config/prisma";

export type DeliveryCreate = Prisma.Args<
	typeof prisma.deliveryDB,
	'create'
>['data']

export type DeliveryUpdate = Prisma.Args<
	typeof prisma.deliveryDB,
	'update'
>['data']

export type DeliveryId = {
	id_delivery: DeliveryDB['id'],
	id_user: User['id']
}