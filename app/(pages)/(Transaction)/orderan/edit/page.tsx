import { Suspense } from 'react';
import FormOrderan from '@/app/(pages)/(Transaction)/orderan/FormOrderan';
import { SearchParams } from '@/interface/model';
import { SkeletonCard } from '@/components/Skeleton';

// export const dynamic    = 'force-dynamic'
// export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

const getIdOrderan   = async ( id: string ) => {
  const res = await fetch( `http://localhost:3000/api/orderan?id=${ id }`,
    { cache: 'no-cache' } )
  return res.json().then( data => data.data )
}
const getDataOrderan = async () => {
  const res = await fetch( 'http://localhost:3000/api/orderan?option=orderan',
    { cache: 'no-cache' } )
  return res.json().then( data => data.data )
}
export default async function Page( { searchParams }: SearchParams ) {
  const dataID      = getIdOrderan( searchParams.id as string )
  const dataOrderan = getDataOrderan()

  const [ orderan, data ] = await Promise.all( [ dataID, dataOrderan ] )

  if( orderan === undefined ) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  Object.assign( data, { listOrderan: [], listItem: [] } )

  console.info( `success fetch data orderan ` )
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormOrderan id={ searchParams.id as string } method={ "PUT" }
                   defaultDataOrder={ orderan }
                   travel={ data.travel }
                   product={ data.product }
                   bank={ data.bank }/>
    </Suspense>
  )
}

