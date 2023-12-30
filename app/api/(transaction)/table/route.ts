import { NextRequest, NextResponse } from 'next/server'
import { TMethod } from '@/interface/model';
import { Inputs } from '@/lib/utils/Inputs';
import { isObjectEmpty } from '@/lib/utils/Objects';
import { orderan } from '@/lib/db/orderan';
import { errorEmptyID } from '@/lib/utils/errorResponse';
import { dashboard } from '@/lib/db/dashboard';
import { Outputs } from '@/lib/utils/Outputs';

export async function GET( request: NextRequest, ) {
  const { id, option, method } = await Inputs( request )
  console.log( `route api ${ method } orderan` )

  return Outputs( method, async () => {
    if( id !== undefined ) {

      if( id === "all" ) {
        return orderan.findAll()
      }

      if( option === "table" ) {
        return orderan.findByStatus( id )
      }

      if( id.includes( "_" ) ) {
        return orderan.findOne( id )
      }
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )
  } )

}

// export async function PATCH( request: NextRequest, ) {
//   const { id, method, json } = await Inputs( request )
//   console.log( `route api ${ method } orderan` )
//
//   if( id !== undefined ) {
//
//     if( id.length > 10 ) {
//       return dashboard.updateStatus( json, id, )
//     }
//   }
//   return NextResponse.json( errorEmptyID( method ), { status: 404 } )
// }

// export async function PUT( request: NextRequest, ) {
//   const { id, json, method } = await Inputs( request )
//   console.log( `route api ${ method } orderan` )
//
//   if( json === undefined ) {
//     return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
//   }
//   if( id !== undefined ) {
//
//     if( id.length > 10 || !isObjectEmpty( json ) ) {
//       return orderan.updateOne( json, id )
//     }
//   }
//   return NextResponse.json( errorEmptyID( method ), { status: 404 } )
//
// }

export async function DELETE( request: NextRequest, ) {

  // try {
  const { method, json: array }: {
    json?: string[],
    method: TMethod,
    // id?: string | string[],
  } = await Inputs( request )

  console.log( array )
  return Outputs( method, async () => {

    if( typeof array === "object" ) {
      console.log( Array.isArray( array ) )
      if( Array.isArray( array ) ) {
        const data = await orderan.destroyMany( array )
        return data
      }
    }

    return NextResponse.json( errorEmptyID( method ) )

  } )
}
