import {NextRequest, NextResponse} from 'next/server'
import {ServiceDeliver} from './../service/delivery.service'
import {DeliverSchema, DeliveryCreate, DeliveryUpdate} from './../validator/schema/deliver.schema'
import {IController} from '@/interface/IController'
import {RequestService} from '../service/request.service'
import {errorHanding} from "@/lib/utils/errorHanding";
import {Params} from "@/interface/params";

class DeliverController implements IController {
  constructor(
    private serviceDeliver: ServiceDeliver,
    private serviceZod: DeliverSchema,
    private serviceReq: RequestService,
  ) {
  }

  async findAll(request: NextRequest) {
    try {
      const {page, take} = this.serviceReq.getPage(request)
      let data = await this.serviceDeliver.findAll(page, take)
      return NextResponse.json(data, {status: 200})
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async findId(request: NextRequest, params: Params) {
    try {
      let {id} = this.serviceReq.getId(params)
      let validId = this.serviceZod.idValid(id)
      const data = await this.serviceDeliver.findOne(validId)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async createOne(request: NextRequest) {
    try {
      let {data} = await this.serviceReq.getData<DeliveryCreate>(request)
      data = this.serviceZod.createValid(data)
      data = await this.serviceDeliver.createOne(data)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async updateOne(request: NextRequest, params: Params) {
    try {
      let {data, id} = await this.serviceReq.getUpdate<DeliveryUpdate>(request, params)
      let validId = this.serviceZod.idValid(id)
      data = this.serviceZod.updateValid(data)
      data = await this.serviceDeliver.updateOne(data, validId)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async deleteOne(req: NextRequest, params: Params) {
    try {
      let {id} = this.serviceReq.getId(params)
      let validId = this.serviceZod.idValid(id)
      const data = await this.serviceDeliver.deleteOne(validId)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }
}

export const deliveryController = new DeliverController(
  new ServiceDeliver(),
  new DeliverSchema(),
  new RequestService(),
)
