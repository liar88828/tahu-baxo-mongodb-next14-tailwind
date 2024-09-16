import type { z } from "zod"
import { ReceiverDB } from "@prisma/client";
import { receiverSchema } from "@/server/schema/receiver.schema";

export type ReceiverCreatePrisma = Omit<ReceiverDB, "id">
export type ReceiverUpdatePrisma = Omit<ReceiverDB, "id" | 'userId'>
//
export type ReceiverCreate = z.output<typeof receiverSchema.create>
export type ReceiverUpdate = z.output<typeof receiverSchema.update>

// error zod
export type ReceiverCreateFormError = z.inferFlattenedErrors<typeof receiverSchema.create>['fieldErrors'];

//key
export type ReceiverCreateKey = Record<keyof ReceiverCreate, any>
export type ReceiverKeyName = keyof ReceiverCreate
