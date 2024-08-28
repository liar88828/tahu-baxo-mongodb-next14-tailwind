// import { NextRequest, NextResponse } from 'next/server'
// import { Inputs } from '@/lib/utils/Inputs';
// import { isObjectEmpty } from '@/lib/utils/Objects';
// import { CreateZod, UpdateZod } from '@/lib/validator/zod';
// import { errorEmptyID } from '@/lib/utils/errorResponse';
//
import {NextRequest} from "next/server";

export async function GET(request: NextRequest,) {
  return Response.json('hello');
}

// export async function GET( request: NextRequest, ) {
//   const { method, id, option } = await Inputs( request )
//   console.log( id, option, 'test get orderan' )
//   return Outputs( method, async () => {
//
//     if( id !== undefined && option !== undefined ) {
//       if( option === "table" && id === "all" ) {
//         return orderan.findAll()
//       }
//
//       if( option === "table" ) {
//         return orderan.findByStatus( id )
//       }
//     }
//
//     if( option !== undefined ) {
//       if( option === "orderan" ) {
//         console.log( 'orderan' )
//         return orderan.getDataForOrderan()
//       }
//     }
//
//     if( id !== undefined ) {
//       if( id.includes( "_" ) ||id.includes( "-" ) ) {
//         return orderan.findOne( id )
//       }
//     }
//
//     if( id === '' ) {
//       throw { message: 'Bad Request', status: 400 }
//     }
//     return NextResponse.json( errorEmptyID( method ), { status: 400 } )
//
//   } )
// }
//
// export async function POST( request: NextRequest, ) {
//   const { method, json } = await Inputs( request )
//   // console.log( `route api ${ method } orderan` )
//   console.log( 'test post orderan', )
//
//   return Outputs( method, async () => {
//     if( json === undefined ) {
//       throw { message: 'Bad Request', status: 400 }
//     }
//     if( json !== null && typeof json === 'object' ) {
//       const data = CreateZod.OrderanSchema.parse( json )
//       return orderan.createOne( data )
//     }
//     return NextResponse.json( errorEmptyID( method ), { status: 400 } )
//
//   } )
// }
//
// export async function PATCH( request: NextRequest, ) {
//   const { method, json, id } = await Inputs( request )
//   console.log( `route api ${ method } orderan` )
//
//   return Outputs( method, async () => {
//
//     if( id === '' || id === undefined ) {
//       throw { message: 'Bad Request', status: 400 }
//     }
//
//     if( json === undefined ) {
//       return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty data" } )
//     }
//     return NextResponse.json( errorEmptyID( method ), { status: 400 } )
//
//   } )
// }
//
// export async function PUT( request: NextRequest, ) {
//   const { method, json, id } = await Inputs( request )
//   // console.log( `route api ${ method } orderan` )
//   return Outputs( method, async () => {
//
//     if( json === undefined || id === undefined ) {
//       throw { message: 'Bad Request', status: 400 }
//     }
//
//     if( id === '' || isObjectEmpty( json ) ) {
//       throw { message: 'Bad Request', status: 400 }
//     }
//     console.log('test put Data orderan')
//
//     if( id.length > 5 || id.includes( '_' ) ||id.includes( "-" ) ) {
//       const data = UpdateZod.OrderanSchema.parse( json )
//       const res  = await orderan.updateOne( data, id )
//       console.log( res )
//       return res
//     }
//     return NextResponse.json( errorEmptyID( method ), { status: 400 } )
//
//   } )
// }
//
// export async function DELETE( request: NextRequest, ) {
//   const { method, json: array, id } = await Inputs( request )
//   // console.log( array, 'array' )
//   //   console.log(Array.isArray( array ), 'array')
//   return Outputs( method, async () => {
//
//     if( !Array.isArray( array ) ) {
//       throw { message: 'Bad Request', status: 400 }
//     }
//     else if( array.length === 0 ) {
//       if( array.length > 1 ) {
//         return orderan.destroyMany( array )
//       }
//     }
//     if( id === undefined || id === '' ) {
//       throw { message: 'Bad Request', status: 400 }
//     }
//     else if( id !== '' ) {
//       return orderan.deleteOne( id )
//     }
//
//   } )
// }
