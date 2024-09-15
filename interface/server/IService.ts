import { GetPage } from "@/interface/server/IServiceRequest";
import { AccessUserID } from "@/server/service/auth/jwt.service";

export type ResponseData<T> = { data: T[], page: number, take: number };

export interface IService<T> {
	findAll(page: number, take: number): Promise<ResponseData<T>>
	
	findAllPrivate(page: GetPage, user: AccessUserID): Promise<ResponseData<T>>
	
	findAllPublic(page: GetPage): Promise<ResponseData<T>>
	
	// findOne(id: number): Promise<any>;
	
	createOne(data: T, user: AccessUserID): Promise<any>;
	
	updateOne(id: any, data: T,): Promise<any>;
	
	deleteOne(id: any, user: AccessUserID): Promise<any>;
	
}