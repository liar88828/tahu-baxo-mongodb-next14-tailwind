import { trolleyService, TrolleyService } from "@/server/service/trolley.service";
import { requestService, RequestService } from "@/server/service/request.service";
import { NextRequest, NextResponse } from "next/server";
import { errorHanding } from "@/lib/error/errorHanding";
import { Params } from "@/interface/params";
import { TrolleyData } from "@/server/schema/trolley.schema";
import { AccessTokenPayload } from "@/server/service/jwt.service";

export class TrolleyController {
  constructor(
    private serviceTrolley : TrolleyService,
    private serviceReq : RequestService,
  ) {
  }

  async getAll(req : NextRequest) {
    try {
      const user = await this.serviceReq.getUserPayload(req)
      // const {data} = await this.serviceReq.getData<TrolleyData>(req)
      return NextResponse.json(await this.serviceTrolley.getAll(user))
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async increment(req : NextRequest, params : Params) {
    try {
      const user : AccessTokenPayload = await this.serviceReq.getUserPayload(req)
      const {data} = await this.serviceReq.getData<TrolleyData>(req)
      const {id} = this.serviceReq.getIdInt(params)
      const res = await this.serviceTrolley.increment({
        userId : user.id,
        trolleyId : user.trolleyId,
        productId : data.productId,
        qty : data.qty,
        trolleyOnProductDBId : id
      },)
      return NextResponse.json(res)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async decrement(req : NextRequest, params : Params) {
    try {
      const user : AccessTokenPayload = await this.serviceReq.getUserPayload(req)
      const {data} = await this.serviceReq.getData<TrolleyData>(req)
      const {id} = this.serviceReq.getIdInt(params)
      const res = await this.serviceTrolley.decrement({
        userId : user.id,
        trolleyId : user.trolleyId,
        productId : data.productId,
        qty : data.qty,
        trolleyOnProductDBId : id
      },)
      return NextResponse.json(res)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async remove(req : NextRequest, params : Params) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      const {id} = this.serviceReq.getIdInt(params)
      return NextResponse.json(this.serviceTrolley.remove({
        trolleyOnProductDBId : id
      }))
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

}

export const trolleyController = new TrolleyController(
  trolleyService,
  requestService,
)
