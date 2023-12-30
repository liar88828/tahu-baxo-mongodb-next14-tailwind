import { Suspense } from 'react';
import FormProduct from '@/app/(pages)/product/Form';
import { SearchParams } from '@/interface/model';
import { SkeletonCard } from '@/components/Skeleton';

const getDataProductById = async ( id: string ) => {
  return fetch( `/api/product?id=${ id }` )
}
// const data: Awaited<TRes<TProduct>> = await Fetch(
//   {
//     method: "GET", to: "product", id: searchParams.id
//   } )
export default async function Page(
  { searchParams }: SearchParams ) {
  const res = await getDataProductById( searchParams.id as string )

  if( !res.ok ) {
    throw new Error( `Error! status: ${ res.status }` );
  }
  const data = await res.json()

  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormProduct method={ 'PUT' }
                   defaultData={ data.data }
                   id={ searchParams.id as string }
                   to={ 'product' }/>
    </Suspense>
  )
}
