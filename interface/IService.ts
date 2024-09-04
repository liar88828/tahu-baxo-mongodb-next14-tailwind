import { AccessTokenPayload } from "@/server/service/jwt.service";

export interface IService<T> {
	findAll(page: number, take: number): Promise<{ data: T[], page: number, take: number }>
	
	findAllPrivate(page: number, take: number, user: AccessTokenPayload): Promise<{
		data: T[],
		page: number,
		take: number
	}>
	
}