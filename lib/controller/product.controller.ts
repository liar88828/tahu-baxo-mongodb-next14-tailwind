import { NextRequest, NextResponse } from 'next/server';
import { ProductSchema } from './../validator/schema/product.schema';
import { ProductService } from './../service/product.service';
import { IController } from "@/interface/IController";
import { ServiceRequest } from '../utils/ServiceRequest';


class ProductController implements IController
{

  constructor (
    private serviceProduct: ProductService,
    private serviceZod: ProductSchema,
    private serviceReq: ServiceRequest
  )
  {
  }



  async findAll ( request: NextRequest )
  {
    try
    {
      const { page, take } = this.serviceReq.getPage( request )
      const data = await this.serviceProduct.findAll( page, take )
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
      id = this.serviceZod.idValid<string>( id)
      const data = this.serviceProduct.findOne( id )
      return NextResponse.json( data, { status: 200 } )
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
      return this.serviceProduct.createOne( data )
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
      id = this.serviceZod.idValid( id as string )
      data = this.serviceZod.updateValid( data )
      return this.serviceProduct.updateOne( data, id )
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
      return this.serviceProduct.deleteOne( id )
    } catch ( e: unknown )
    {
      return e.message
    }
  }

}

export const productController = new ProductController
  (
    new ProductService(),
    new ProductSchema(),
    new ServiceRequest()
  )
