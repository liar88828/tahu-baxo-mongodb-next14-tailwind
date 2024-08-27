import {BankCreate, BankUpdate} from './../validator/schema/bank.schema'
import {ServiceRequest} from './../utils/ServiceRequest'
import {NextRequest} from 'next/server'
import {ServiceBank} from '@/lib/service/bank.service'
import {BankSchema} from '@/lib/validator/schema/bank.schema'
import {IController} from '@/interface/IController'
import {errorHanding} from '../utils/errorHanding'
import {Params} from "@/interface/params";

class BankController implements IController {
  constructor(
    private serviceBank: ServiceBank,
    private serviceZod: BankSchema,
    private serviceReq: ServiceRequest,
  ) {
  }

  async findAll(req: NextRequest) {
    try {
      const {page, take} = this.serviceReq.getPage(req)
      const data = await this.serviceBank.findPaginate(page, take)
      return Response.json(data)
    } catch (e: unknown) {

      return errorHanding(e)
    }
  }

  async findId(req: NextRequest, params: Params) {
    try {
      let {id} = this.serviceReq.getIdInt(params)
      id = this.serviceZod.idValidInt(id)
      const data = await this.serviceBank.findId(id)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async createOne(req: NextRequest) {
    try {
      let {data} = await this.serviceReq.getData<BankCreate>(req)
      const validData = this.serviceZod.createValid(data)
      data = await this.serviceBank.createOne(validData)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async updateOne(req: NextRequest, params: Params) {
    try {
      let {data, id} = await this.serviceReq.getUpdate<BankUpdate>(
        req, params
      )
      let validId = this.serviceZod.idValid(id)
      data = this.serviceZod.updateValid(data)
      data = await this.serviceBank.updateOne(data, validId)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async deleteOne(req: NextRequest, params: Params) {
    try {
      let {id} = this.serviceReq.getIdInt(params)
      id = this.serviceZod.idValidInt(id)
      const data = await this.serviceBank.deleteOne(id)
      return Response.json(data)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }
}

export const bankController = new BankController(
  new ServiceBank(),
  new BankSchema(),
  new ServiceRequest(),
)
