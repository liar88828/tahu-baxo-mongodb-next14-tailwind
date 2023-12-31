import { SkeletonCard } from '@/components/Skeleton';
import { Suspense } from 'react';
import FormBank from '@/app/(pages)/bank/Form';
import { SearchParams } from '@/interface/model';
const getDataBankById = async ( id: string ) => {
  return fetch( `/api/product?id=${ id }` )
}

export default async function Home( { searchParams }: SearchParams ) {

  // const data: Awaited<TRes<TBank>> = await Fetch(
  //   { method: "GET", to: "bank", id: searchParams.id } )
  // console.log( data )


  const res = await getDataBankById( searchParams.id as string )
  if( !res.ok ) {
    throw new Error( `Error! status: ${ res.status }` );
  }
  const data = await res.json()

  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormBank
        method={ 'PUT' }
        defaultData={ data.data }
        to={ 'bank' }/>
    </Suspense>
  )
}

