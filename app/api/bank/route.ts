import { NextRequest, NextResponse } from 'next/server';
import { Inputs } from '@/lib/utils/Inputs';
import { Outputs } from '@/lib/utils/Outputs';
import { errorEmptyID } from '@/lib/utils/errorResponse';
import { bank } from '@/lib/db/bank';
import { CreateZod, UpdateZod } from '@/lib/validator/zod';

export async function GET( request: NextRequest ) {
  const { id, method, page, take } = await Inputs( request )
  console.log( `route api ${ method } bank` )

  return await Outputs( method, async () => {

    if( page !== 0 && take !== 0 ) {
      // console.log( 'pagenate' )
      // console.log( page, take )

      return bank.findPaginate( page, take )
    }

    if( id === '' || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( id.includes( "all" ) ) {
      console.log( 'find all' )
      return bank.findAll()
    }
    if( id.length > 5 ) {
      console.log( `one ${ id }` )
      return bank.findOne( id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )
  } )
}

export async function POST( request: NextRequest ) {
  const { method, json } = await Inputs( request )
  console.log( `route api ${ method } bank` )

  return Outputs( method, async () => {
    if( json === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( json !== null && typeof json === 'object' ) {

      const data = CreateZod.BankSchema.parse( json )
      return bank.createOne( data )
    }
    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )

}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await Inputs( request )
  console.log( `route api ${ method } bank` )

  return Outputs( method, async () => {
    if( id === '' || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id.length > 2 ) {
      return bank.deleteOne( id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}

export async function PUT( request: NextRequest ) {
  const { id, method, json } = await Inputs( request )
  console.log( `route api ${ method } bank` )

  return Outputs( method, async () => {

    if( id === '' || json === undefined || id === undefined ) {
      throw { message: 'Bad Request', status: 400 }
    }

    if( id.length > 5 ) {
      const data = UpdateZod.BankSchema.parse( json )
      return bank.updateOne( data, id )
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}