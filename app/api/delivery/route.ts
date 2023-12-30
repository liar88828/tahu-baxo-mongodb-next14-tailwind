import { NextRequest, NextResponse } from 'next/server'
import { Inputs } from '@/lib/utils/Inputs';
import { Outputs } from '@/lib/utils/Outputs';
import { errorEmptyID } from '@/lib/utils/errorResponse';
import { delivery } from '@/lib/db/delivery';
import { CreateZod, UpdateZod } from '@/lib/validator/zod';

export async function GET( request: NextRequest, ) {
  const { id, method, take, page } = await Inputs( request )
  console.log( `route api ${ method } delivery ${ id }` )
  return Outputs( method, async () => {
    if( page !== 0 && take !== 0 ) {
      return delivery.findPaginate( page, take )
    }
    if( id === '' || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id === "all" ) {
      return delivery.findAll()
    }
    if( id.length > 5 ) {
      return delivery.findOne( id )
    }
    return NextResponse.json( errorEmptyID( method ) )

  } )
}

export async function POST( request: NextRequest ) {
  const { method, json } = await Inputs( request )
  console.log( `route api ${ method } travel` )
  console.log( json )

  return Outputs( method, async () => {
    if( json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json !== null && typeof json === 'object' ) {
      const data = CreateZod.DeliverySchema.parse( json )
      return delivery.createOne( data )
    }
  } )
}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await Inputs( request );
  console.log( `route api ${ method } travel` )

  return Outputs( method, async () => {

    if( id === '' || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id.length > 5 ) {
      return delivery.deleteOne( id )
    }
    return NextResponse.json( errorEmptyID( method ) )

  } )
}

export async function PUT( request: NextRequest ) {
  const { id, method, json } = await Inputs( request )
  console.log( `route api ${ method } travel` )

  return Outputs( method, async () => {

    if( id === '' || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id.length > 5 ) {
      const data = UpdateZod.DeliverySchema.parse( json )
      return delivery.updateOne( data, id )
    }
    console.log( "error ya" )
    return NextResponse.json( errorEmptyID( method ) )

  } )
}
