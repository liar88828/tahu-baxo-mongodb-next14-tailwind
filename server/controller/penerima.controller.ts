import { penerimaService, PenerimaService } from "@/server/service/penerima.service";
import { NextRequest, NextResponse } from "next/server";
import { errorHanding } from "@/lib/utils/errorHanding";
import { Params } from "@/interface/params";
import { requestService, RequestService } from "@/server/service/request.service";
import { PenerimaCreate } from "@/server/schema/penerima.schema";

export class PenerimaController {
  constructor(
    private serviceReq : RequestService,
    private servicePenerima : PenerimaService
  ) {
  }

  async findAll(request : NextRequest) {
    try {
      const {page, take} = this.serviceReq.getPage(request)
      let data = await this.servicePenerima.findAll(page, take)
      return NextResponse.json(data, {status : 200})
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async findId(request : NextRequest, params : Params) {
    try {
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.servicePenerima.findOne(id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async createOne(request : NextRequest) {
    try {
      let {data} = await this.serviceReq.getData<PenerimaCreate>(request)
      data = await this.servicePenerima.createOne(data)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async updateOne(request : NextRequest, params : Params) {
    try {
      let {data, id} = await this.serviceReq.getUpdateInt<PenerimaCreate>(request, params)
      data = await this.servicePenerima.updateOne(data, id)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async deleteOne(req : NextRequest, params : Params) {
    try {
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
