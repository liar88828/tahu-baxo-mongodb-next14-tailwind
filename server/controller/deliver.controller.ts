import { NextRequest, NextResponse } from 'next/server'
import { deliveryService, ServiceDeliver } from '@/server/service/delivery.service'
import { DeliveryCreate, DeliveryUpdate } from '@/server/schema/deliver.schema'
import { IController } from '@/interface/IController'
import { requestService, RequestService } from '@/server/service/request.service'
import { errorHanding } from "@/lib/utils/errorHanding";
import { Params } from "@/interface/params";

class DeliverController implements IController {
  constructor(
    private serviceDeliver : ServiceDeliver,
    private serviceReq : RequestService,
  ) {
  }

  async findAll(request : NextRequest) {
    try {
      const {page, take} = this.serviceReq.getPage(request)
      let data = await this.serviceDeliver.findAll(page, take)
      return NextResponse.json(data, {status : 200})
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async findId(request : NextRequest, params : Params) {
    try {
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.serviceDeliver.findOne(id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async createOne(request : NextRequest) {
    try {
      let {data} = await this.serviceReq.getData<DeliveryCreate>(request)
      data = await this.serviceDeliver.createOne(data)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async updateOne(request : NextRequest, params : Params) {
    try {
      let {data, id} = await this.serviceReq.getUpdateInt<DeliveryUpdate>(request, params)
      data = await this.serviceDeliver.updateOne(data, id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async deleteOne(req : NextRequest, params : Params) {
    try {
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.serviceDeliver.deleteOne(id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }
}

export const deliveryController = new DeliverController(
  deliveryService,
  requestService,
)
