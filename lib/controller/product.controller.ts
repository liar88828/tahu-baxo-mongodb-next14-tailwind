import {ProductCreate, ProductUpdate} from './../db/prisma'
import {NextRequest} from 'next/server'
import {ProductSchema} from './../validator/schema/product.schema'
import {ProductService} from './../service/product.service'
import {IController} from '@/interface/IController'
import {RequestService} from '../service/request.service'
import {errorHanding} from '../utils/errorHanding'
import {Params} from "@/interface/params";

class ProductController implements IController {
  constructor(
    private serviceProduct: ProductService,
    private serviceZod: ProductSchema,
    private serviceReq: RequestService,
  ) {
  }

  async findAll(request: NextRequest) {
    try {
      const {page, take} = this.serviceReq.getPage(request)
      const data = await this.serviceProduct.findAll(page, take)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async findId(request: NextRequest, params: Params) {
    try {
      let {id} = this.serviceReq.getId(params)
      let validId = this.serviceZod.idValid(id)
      const data = await this.serviceProduct.findId(validId)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async createOne(request: NextRequest) {
    try {
      let {data} = await this.serviceReq.getData<ProductCreate>(request)
      data = this.serviceZod.createValid(data)
      data = await this.serviceProduct.createOne(data)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }


  async updateOne(request: NextRequest, params: Params) {
    try {
      let {data, id} = await this.serviceReq.getUpdate<ProductUpdate>(request, params)
      let validId = this.serviceZod.idValid(id)
      data = this.serviceZod.updateValid(data)
      data = await this.serviceProduct.updateOne(data, validId)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async deleteOne(req: NextRequest, params: Params) {
    try {
      let {id} = this.serviceReq.getId(params)
      let validId = this.serviceZod.idValid(id)
      const data = await this.serviceProduct.deleteOne(validId)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }
}

export const productController = new ProductController(
  new ProductService(),
  new ProductSchema(),
  new RequestService(),
)
