import { NextRequest } from "next/server"
import { productService, ProductService, } from "@/server/service/product.service"
import { IController } from "@/interface/server/IController"
import { requestService, RequestService, } from "@/server/service/request.service"
import { errorHanding } from "@/lib/error/errorHanding"
import type { Params } from "@/interface/server/param"
import type { ProductCreate, ProductUpdate, } from "@/interface/model/product.type"

class ProductController implements IController {
  constructor(
    private serviceReq: RequestService,
    private serviceProduct: ProductService
  ) {
  }
  
  async findAll(req: NextRequest) {
		console.log('get all')
    try {
			const page = this.serviceReq.getPage(req)
			const data = await this.serviceProduct.findAllPublic(page)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }
  
  async findAllPrivate(req: NextRequest) {
    try {
      const user = await this.serviceReq.getUserPayload(req)
      const page = this.serviceReq.getPage(req)
      const data = await this.serviceProduct.findAllPrivate(page, user)
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
  
  async findStock(req: NextRequest, params: Params) {
    try {
      const { page, take } = this.serviceReq.getPage(req)
      return Response.json(
        await this.serviceProduct.findAllStock(page, take, "")
      )
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
      data.userId = user.id
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
      return Response.json(
				await this.serviceProduct.updateOne(
					{
          id_product: id,
          id_user: user.id,
					},
					data,
				)
      )
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }
  
  async deleteOne(req: NextRequest, params: Params) {
    try {
      const user = await this.serviceReq.getUserPayload(req)
      let { id } = this.serviceReq.getIdInt(params)
      return Response.json(
        await this.serviceProduct.deleteOne({
          id_product: id,
          id_user: user.id,
        })
      )
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }
}

export const productController = new ProductController(
  requestService,
  productService,
)
