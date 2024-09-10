import { AccessTokenPayload } from "@/server/service/auth/jwt.service";
import { GetPage } from "@/interface/server/IServiceRequest";

export type ResponseData<T> = { data: T[], page: number, take: number };

export interface IService<T> {
	findAll(page: number, take: number): Promise<ResponseData<T>>
	
	findAllPrivate(page: GetPage, user: AccessTokenPayload): Promise<ResponseData<T>>
	
	findAllPublic(page: GetPage): Promise<ResponseData<T>>
	
}