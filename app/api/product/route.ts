import { NextRequest, NextResponse } from 'next/server'
import { Inputs } from '@/lib/utils/Inputs';
import { errorEmptyID } from '@/lib/utils/errorResponse';
import { Outputs } from '@/lib/utils/Outputs';
import { CreateZod, UpdateZod } from '@/lib/validator/zod';
import { produk } from '@/lib/db/produk';

export async function GET( request: NextRequest ) {
  const { id, method, page, take } = await Inputs( request )
  console.log( `route api ${ method } product` )

  return Outputs( method, async () => {
    if( page !== 0 && take !== 0 ) {
      // console.log(page,take)
      return produk.findPaginate( page, take )
    }
    if( id === '' || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( id === "all" ) {
      return produk.findAll()
    }
    if( id.length >= 5 ) {
      return produk.findOne( id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )

}

export async function POST( request: NextRequest, ) {
  const { method, json } = await Inputs( request )
  console.log( `route api ${ method } product` )

  return Outputs( method, async () => {

    if( json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json !== null && typeof json === 'object' ) {
      const data = CreateZod.ProductSchema.parse( json )
      return produk.createOne( data )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await Inputs( request )
  console.log( `route api ${ method } product ${ id }` )

  return Outputs( method, async () => {

    if( id === '' || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( id.length > 5 ) {
      return produk.deleteOne( id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )
  } )
}

export async function PUT( request: NextRequest, ) {
  const { method, json, id } = await Inputs( request )
  console.log( `route api ${ method } product` )

  return Outputs( method, async () => {

    if( id === '' || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( id.length > 5 ) {
      const data = UpdateZod.ProductSchema.parse( json )
      return produk.updateOne( data, id )
    }

    return NextResponse.json( errorEmptyID( method ) )
  } )
}




