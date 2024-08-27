import prisma  from "@/lib/db/prisma";
import { z } from 'zod'
import { ISchema } from "@/interface/ISchema";


export type DeliveryCreate = Prisma.Args<typeof prisma.delivery, 'create'>[ 'data' ]
export type DeliveryUpdate = Prisma.Args<typeof prisma.delivery, 'update'>[ 'data' ]
export class DeliverSchema implements ISchema
{

  id = z.string( { required_error: 'ID is required', } ).optional()
  create = z.object( {
    id: this.id,
    nama: z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    hp: z.string( { required_error: 'Hp is required', } ).min( 1 ).max( 100 ),
    lokasi: z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    jenis: z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    img: z.string( { required_error: 'Img is required', } ).min( 1 ).max( 300 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ),
    harga: z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
  } ) satisfies z.Schema<DeliveryCreate>


  update = z.object( {
    id: z.string( { required_error: 'Id is required', } ).optional(),
    nama: z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    hp: z.string( { required_error: 'Hp is required', } ).min( 1 ).max( 100 ),
    lokasi: z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    jenis: z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    img: z.string( { required_error: 'Img is required', } ).min( 1 ).max( 300 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ).optional(),
    harga: z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
  } ) satisfies z.Schema<DeliveryUpdate>

  createValid ( data: Object )
  {
    data = this.create.parse( data )
    if ( !data )
    {
      throw new Error( "data is not valid" )
    }
    return data
  }

  updateValid ( data: Object )
  {
    data = this.update.parse( data )
    if ( !data )
    {
      throw new Error( "data is not valid" )
    }
    return data
  }

  idValid ( id: string | number ): string
  {
    id = this.id.parse( id )
    if ( !id )
    {
      throw new Error( "data is not valid" )
    }
    return id as string
  }
}
