import { AccessTokenPayload } from "@/server/service/jwt.service";

export type ResponseData<T> = { data: T[], page: number, take: number };

export interface IService<T> {
	findAll(page: number, take: number): Promise<ResponseData<T>>
	
	findAllPrivate(page: number, take: number, user: AccessTokenPayload): Promise<ResponseData<T>>
	
}