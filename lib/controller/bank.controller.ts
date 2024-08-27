import { redirect } from 'next/navigation'
import { RequestMeta } from 'next/dist/server/request-meta'
import { RequestMeta } from 'next/dist/server/request-meta'
import { ServiceRequest } from './../utils/ServiceRequest'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceBank } from '@/lib/service/bank.service'
import { BankSchema } from "@/lib/validator/schema/bank.schema";
import { IController } from "@/interface/IController";
import { ISchema } from "@/interface/ISchema";


class BankController implements IController
{
  constructor (
    private serviceBank: ServiceBank,
    private serviceZod: BankSchema,
    private serviceReq: ServiceRequest
  )
  {
  }


  async findAll ( req: NextRequest )
  {
    try
    {
      const { page, take } = this.serviceReq.getPage( req )
      const data = await this.serviceBank.findPaginate( page, take )
      return NextResponse.json( data, { status: 200 } )
    } catch ( e: unknown )
    {
      return e
    }
  }

  async findOne ( req: NextRequest )
  {
    try
    {
      let { id } = this.serviceReq.getId( req )
      id = this.serviceZod.idValid( id )
      return this.serviceBank.findOne( id as number )
    } catch ( e: unknown )
    {
      return e
    }
  }

  async createOne ( req: NextRequest )
  {
    try
    {
      let { data, } = await this.serviceReq.getData( req )
      data = this.serviceZod.createValid( data )
      return this.serviceBank.createOne( data )
    } catch ( e: unknown )
    {
      return e.message
    }

  }

  async updateOne ( request: NextRequest )
  {
    try
    {
      let { data, id } = request
      id = this.serviceZod.idValid( id )
      data = this.serviceZod.updateValid( data )
      return this.serviceBank.updateOne( data, id )
    } catch ( e: unknown )
    {
      return e.message
    }
  }

  async deleteOne ( req: NextRequest )
  {
    try
    {
      let { id } = request
      id = this.serviceZod.idValid( id )
      return this.serviceBank.deleteOne( id )
    } catch ( e: unknown )
    {
      return e.message
    }
  }
}


export const bankController = new BankController(
  new ServiceBank(),
  new BankSchema(),
  new ServiceRequest()
)
