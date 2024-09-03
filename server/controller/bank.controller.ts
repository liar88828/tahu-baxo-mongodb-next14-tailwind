import { BankCreate, BankUpdate } from '../schema/bank.schema'
import { requestService, RequestService } from '@/server/service/request.service'
import { NextRequest } from 'next/server'
import { bankService, BankService } from '@/server/service/bank.service'
import { IController } from '@/interface/IController'
import { Params } from "@/interface/params";
import { errorHanding } from "@/lib/error/errorHanding";

class BankController implements IController {
  constructor(
    private serviceBank : BankService,
    private serviceReq : RequestService,
  ) {
  }

  async findAll(req : NextRequest) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      const {page, take} = this.serviceReq.getPage(req)
      const data = await this.serviceBank.findPaginate(page, take)
      return Response.json(data)
    } catch (e : unknown) {

      return errorHanding(e)
    }
  }

  async findId(req : NextRequest, params : Params) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.serviceBank.findId({id_bank : id})
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async findIdPrivate(req : NextRequest, params : Params) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.serviceBank.findIdPrivate({id_bank : id, id_user : user.id})
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async createOne(req : NextRequest) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      let {data} = await this.serviceReq.getData<BankCreate>(req)
      data = await this.serviceBank.createOne(data)
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async updateOne(req : NextRequest, params : Params) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      let {data, id} = await this.serviceReq.getUpdateInt<BankUpdate>(req, params)
      data = await this.serviceBank.updateOne(data, {
        id_bank : id,
        id_user : user.id
      })
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async deleteOne(req : NextRequest, params : Params) {
    try {
      const user = this.serviceReq.getUserPayload(req)
      let {id} = this.serviceReq.getIdInt(params)
      const data = await this.serviceBank.deleteOne({
        id_bank : id,
        id_user : user.id
      })
      return Response.json(data)
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }
}

export const bankController = new BankController(
  bankService,
  requestService,
)