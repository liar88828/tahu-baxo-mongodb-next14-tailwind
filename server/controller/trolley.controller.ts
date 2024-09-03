import { TrolleyData, trolleyService, TrolleyService } from "@/server/service/trolley.service";
import { requestService, RequestService } from "@/server/service/request.service";
import { NextRequest, NextResponse } from "next/server";
import { errorHanding } from "@/lib/utils/errorHanding";
import { Params } from "@/interface/params";

export class TrolleyController {
  constructor(
    private serviceTrolley : TrolleyService,
    private serviceReq : RequestService,
  ) {
  }

  async getAll(req : NextRequest) {
    try {
      // this.serviceReq.getUserPayload(req)
      const {data} = await this.serviceReq.getData<TrolleyData>(req)
      return NextResponse.json(this.serviceTrolley.getAll(data))
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async add(req : NextRequest, params : Params) {
    try {
      // this.serviceReq.getUserPayload(req)
      const {data} = await this.serviceReq.getData<TrolleyData>(req)
      const {id} = this.serviceReq.getIdInt(params)
      return NextResponse.json(this.serviceTrolley.add(data, {
        trolleyOnProductDBId : id
      }))
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async remove(req : NextRequest, params : Params) {
    try {
      // this.serviceReq.getUserPayload(req)
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
