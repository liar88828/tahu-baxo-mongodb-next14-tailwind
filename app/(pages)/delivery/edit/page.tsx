import { SearchParams } from '@/interface/model';
import { SkeletonCard } from '@/components/Skeleton';
import { Suspense } from 'react';
import FormDeliver from '@/app/(pages)/delivery/Form';

const getDataDeliveryById = async ( id: string ) => {
  return fetch( `/api/product?id=${ id }` )
}
// const data: Awaited<TRes<TDelivery>> = await Fetch(
//   {
//     method: "GET", to: "delivery", id: searchParams.id
//   } )
export default async function Page( { searchParams }: SearchParams ) {

  const res = await getDataDeliveryById( searchParams.id as string )
  if( !res.ok ) {
    throw new Error( `Error! status: ${ res.status }` );
  }
  const data = await res.json()

  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormDeliver method={ 'PUT' }
                   defaultData={ data.data }
                   id={ searchParams.id as string }
                   to={ 'delivery' }/>
    </Suspense>

  )
}
