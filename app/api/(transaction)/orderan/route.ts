import { NextRequest, NextResponse } from 'next/server'
import { Inputs } from '@/lib/utils/Inputs';
import { Outputs } from '@/lib/utils/Outputs';
import { isObjectEmpty } from '@/lib/utils/Objects';
import { CreateZod, UpdateZod } from '@/lib/validator/zod';
import { orderan } from '@/lib/db/orderan';
import { errorEmptyID } from '@/lib/utils/errorResponse';

export async function GET( request: NextRequest, ) {
  const { method, id, option } = await Inputs( request )
  return Outputs( method, async () => {

    if( id !== undefined && option !== undefined ) {
      if( option === "table" ) {
        return orderan.findByStatus( id )
      }
    }

    if( option !== undefined ) {
      if( option === "orderan" ) {
        console.log( 'orderan' )
        return orderan.getDataForOrderan()
      }
    }

    if( id !== undefined ) {
      if( id.includes( "_" ) ) {
        return orderan.findOne( id )
      }
    }

    if( option === "table" && id === "all" ) {
      return orderan.findAll()
    }

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function POST( request: NextRequest, ) {
  const { method, json } = await Inputs( request )
  console.log( `route api ${ method } orderan` )

  return Outputs( method, async () => {
    if( json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json !== null && typeof json === 'object' ) {
      const data = CreateZod.OrderanSchema.parse( json )
      return orderan.createOne( data )
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function PATCH( request: NextRequest, ) {
  const { method, json, id } = await Inputs( request )
  console.log( `route api ${ method } orderan` )

  return Outputs( method, async () => {

    if( id === '' || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( json === undefined ) {
      return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function PUT( request: NextRequest, ) {
  const { method, json, id } = await Inputs( request )
  // console.log( `route api ${ method } orderan` )
  return Outputs( method, async () => {

    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( json === undefined ) {
      return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
    }
    if( id !== undefined ) {

      if( id.length > 5 || !isObjectEmpty( json ) ) {
        const data = UpdateZod.OrderanSchema.parse( json )
        const res  = await orderan.updateOne( data, id )
        // console.log( res )
        return res
      }
      return NextResponse.json( errorEmptyID( method ), { status: 400 } )
    }
  } )
}

export async function DELETE( request: NextRequest, ) {
  const { method, json: array } = await Inputs( request )
  return Outputs( method, async () => {

    if( Array.isArray( array ) ) {
      return { message: 'Bad Request', status: 400 }
    }

    if( array.length > 1 ) {
      return orderan.destroyMany( array )

    }
  } )
}
