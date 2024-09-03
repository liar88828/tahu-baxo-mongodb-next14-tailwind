import { penerimaService, PenerimaService } from "@/server/service/penerima.service";
import { NextRequest, NextResponse } from "next/server";
import { errorHanding } from "@/lib/error/errorHanding";
import { Params } from "@/interface/params";
import { requestService, RequestService } from "@/server/service/request.service";
import { PenerimaCreate } from "@/server/schema/penerima.schema";

export class PenerimaController {
  constructor(
    private serviceReq : RequestService,
    private servicePenerima : PenerimaService
  ) {
  }

  async findAll(req : NextRequest) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      const {page, take} = this.serviceReq.getPage(req)
      let data = await this.servicePenerima.findAll(page, take)
      return NextResponse.json(data, {status : 200})
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async findId(req : NextRequest, params : Params) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.servicePenerima.findOne(id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async createOne(req : NextRequest) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      let {data} = await this.serviceReq.getData<PenerimaCreate>(req)
      data = await this.servicePenerima.createOne(data)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async updateOne(req : NextRequest, params : Params) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      let {data, id} = await this.serviceReq.getUpdateInt<PenerimaCreate>(req, params)
      data = await this.servicePenerima.updateOne(data, id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async deleteOne(req : NextRequest, params : Params) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.servicePenerima.deleteOne(id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }
}

export const penerimaController = new PenerimaController(
  requestService,
  penerimaService
)
