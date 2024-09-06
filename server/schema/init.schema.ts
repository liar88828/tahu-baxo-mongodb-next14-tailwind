import { z } from "zod";

export const phoneInit = z.string({ required_error: 'Hp is required', }).min(2).max(30)
export const imageInit = z.string({ required_error: 'Img is required', }).max(200).nullable()
export const addressInit = z.string({ required_error: 'Lokasi is required', }).min(2).max(100)
export const descriptionInit = z.string({ required_error: 'Keterangan is required', }).min(2).max(300)
export const nameInit = z.string({ required_error: 'nama is required', }).min(2).max(30)
export const userId = z.string({ required_error: 'User is required' }).min(1).max(100)
