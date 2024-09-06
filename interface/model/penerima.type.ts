import type { z } from "zod"
import type { penerimaSchema } from "@/server/schema/penerima.schema"
import { PenerimaDB } from "@prisma/client";

export type PenerimaCreatePrisma = Omit<PenerimaDB, 'userId' | "id">
export type PenerimaCreate = z.output<typeof penerimaSchema.create>
