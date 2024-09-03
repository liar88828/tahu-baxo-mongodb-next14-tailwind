import { NextRequest } from 'next/server'
import { productService, ProductService } from '@/server/service/product.service'
import { IController } from '@/interface/IController'
import { requestService, RequestService } from '@/server/service/request.service'
import { errorHanding } from '@/lib/utils/errorHanding'
import { Params } from "@/interface/params";
import { ProductCreate, ProductUpdate } from "@/server/schema/product.schema";

class ProductController implements IController {
  constructor(
    private serviceReq : RequestService,
    private serviceProduct : ProductService,
  ) {
  }

  async findAll(request : NextRequest) {
    try {
      const {page, take} = this.serviceReq.getPage(request)
      const data = await this.serviceProduct.findAll(page, take)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async findId(request : NextRequest, params : Params) {
    try {
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.serviceProduct.findId(id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async createOne(request : NextRequest) {
    try {
      let {data} = await this.serviceReq.getData<ProductCreate>(request)
      data = await this.serviceProduct.createOne(data)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async updateOne(request : NextRequest, params : Params) {
    try {
      let {data, id} = await this.serviceReq.getUpdateInt<ProductUpdate>(request, params)
      data = await this.serviceProduct.updateOne(data, id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async deleteOne(req : NextRequest, params : Params) {
    try {
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.serviceProduct.deleteOne(id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }
}

export const productController = new ProductController(
  requestService,
  productService,
)
