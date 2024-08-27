import { ServiceDeliver } from './../service/delivery.service';
import { DeliverSchema } from './../validator/schema/deliver.schema';
import { delivery } from '@/lib/db/delivery';
import { IController } from "@/interface/IController";
import { ISchema } from "@/interface/ISchema";
import { ServiceRequest } from '../utils/ServiceRequest';


class DeliverController implements IController
{

  constructor (
    private serviceDeliver: ServiceDeliver,
    private serviceZod: DeliverSchema,
    private serviceReq: ServiceRequest
  )
  {
  }



  async findAll ( request: NextRequest )
  {
    try
    {
      const { page, take } = this.serviceReq.getPage( request )
      const data = await this.serviceDeliver.findAll( page, take )
      return NextResponse.json( data, { status: 200 } )
    } catch ( e: unknown )
    {
      return e.message
    }
  }

  async findOne ( request: NextRequest )
  {
    try
    {
      let { id } = this.serviceReq.getId( request )
      id = this.serviceZod.idValid( id as number)
      return this.serviceDeliver.findOne( id )
    } catch ( e: unknown )
    {
      return e.message
    }
  }

  async createOne ( request: NextRequest )
  {
    try
    {
      let { data, } = this.serviceReq.getData( request )
      data = this.serviceZod.createValid( data )
      return this.serviceDeliver.createOne( data )
    } catch ( e: unknown )
    {
      return e.message
    }

  }

  async updateOne ( request: NextRequest )
  {
    try
    {
      let { data, id } = this.serviceReq.getUpdate( request )
      id = this.serviceZod.idValid( id as string)
      data = this.serviceZod.updateValid( data )
      return this.serviceDeliver.updateOne( data, id )
    } catch ( e: unknown )
    {
      return e.message
    }
  }

  async deleteOne ( req: NextRequest )
  {
    try
    {
      let { id } = this.serviceReq.getId( req )
      id = this.serviceZod.idValid( id as string )
      return this.serviceDeliver.deleteOne( id )
    } catch ( e: unknown )
    {
      return e.message
    }
  }
}

export const deliveryController = new DeliverController
  (
    new ServiceDeliver(),
    new DeliverSchema(),
    new ServiceRequest()
  )
