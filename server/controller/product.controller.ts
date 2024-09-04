import { NextRequest } from 'next/server'
import { productService, ProductService } from '@/server/service/product.service'
import { IController } from '@/interface/IController'
import { requestService, RequestService } from '@/server/service/request.service'
import { errorHanding } from '@/lib/error/errorHanding'
import { Params } from "@/interface/params";
import { ProductCreate, ProductUpdate } from "@/server/schema/product.schema";

class ProductController implements IController {
	constructor(
		private serviceReq: RequestService,
		private serviceProduct: ProductService,
	) {
	}
	
	async findAll(req: NextRequest) {
		try {
			const { page, take } = this.serviceReq.getPage(req)
			const data = await this.serviceProduct.findAll(page, take)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	async findAllPrivate(req: NextRequest) {
		const user = this.serviceReq.getUserPayload(req)
		
		try {
			const { page, take } = this.serviceReq.getPage(req,)
			const data = await this.serviceProduct.findAll(page, take)
			return Response.json(data)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	
	async findId(req: NextRequest, params: Params) {
		try {
			let { id } = this.serviceReq.getIdInt(params)
			return Response.json(await this.serviceProduct.findIdPublic(id))
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async findIdPrivate(req: NextRequest, params: Params) {
		try {
			const user = this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(params)
			return Response.json(await this.serviceProduct.findIdPublic(id))
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	
	async createOne(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data } = await this.serviceReq.getData<ProductCreate>(req)
			return Response.json(await this.serviceProduct.createOne(data))
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async updateOne(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data, id } = await this.serviceReq.getUpdateInt<ProductUpdate>(req, params)
			data.userId = user.id
			return Response.json(await this.serviceProduct.updateOne(data, {
				id_product: id,
				id_user: user.id
			}))
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async deleteOne(req: NextRequest, params: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(params)
			return Response.json(await this.serviceProduct.deleteOne({
				id_product: id,
				id_user: user.id
			}))
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
}

export const productController = new ProductController(
	requestService,
	productService,
)
