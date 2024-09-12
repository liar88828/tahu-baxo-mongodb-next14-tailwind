import type { z } from "zod"
import type { penerimaSchema } from "@/server/schema/penerima.schema"
import { ReceiverDB } from "@prisma/client";

export type PenerimaCreatePrisma = Omit<ReceiverDB, 'userId' | "id">
export type PenerimaCreate = z.output<typeof penerimaSchema.create>
