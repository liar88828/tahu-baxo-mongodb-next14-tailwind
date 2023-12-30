import { NextRequest, NextResponse } from 'next/server'
import { Inputs } from '@/lib/utils/Inputs';
import { errorEmptyID } from '@/lib/utils/errorResponse';
import { dashboard } from '@/lib/db/dashboard';
import { Outputs } from '@/lib/utils/Outputs';

export async function GET( request: NextRequest ) {
  const { method, option, id } = await Inputs( request )
  console.log( `route api ${ method } dashboard` )

  return Outputs( method, async () => {
    if( option ) {

      // All
      if( option === "all" ) {
        return {
          // ListDashboard   : await dashboard.statusNotify(),
          LineChart       : await dashboard.semuaOrderTahun(),
          DonatChart      : await dashboard.semuaProductLast(),
          BarVerticalChart: await dashboard.aggregateProductPerMonth(),
        }

      }

      // ListDashboard
      if( option === "notify" ) {
        return dashboard.statusNotify()
      }

      // Card Pembeli Status
      if( option === "pesanan" ) {
        // console.log( value )
        console.log( option, id )

        return dashboard.statusPesanan( id )
      }

      // LineChart
      if( option === "orderTahun" ) {
        return dashboard.semuaOrderTahun()
      }
      //DonatChart
      if( option === "productLast" ) {
        return dashboard.semuaProductLast()
      }
      if( option === "productNow" ) {
        return dashboard.semuaProductNow()
      }

      // BarVerticalChart
      if( option === "productPerMonth" ) {
        // console.log( 'BarVerticalChart' )
        return dashboard.aggregateProductPerMonth()
      }
    }

    return NextResponse.json( errorEmptyID( method ), { status: 500 } )

  } )

}

export async function PATCH( request: NextRequest, ) {
  const { method, id, option } = await Inputs( request )
  console.log( `route api ${ method } dashboard` )

  return Outputs( method, async () => {
    if( typeof id !== 'string' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( id === '' ) {
      throw { message: 'Bad Request', status: 400 }
    }
    if( typeof option === 'string' ) {

      if( id.length > 3 ) {
        console.log( 'change status' )
        return dashboard.updateStatus( option, id )
      }
    }

    return NextResponse.json( errorEmptyID( method ), { status: 400 } )

  } )
}