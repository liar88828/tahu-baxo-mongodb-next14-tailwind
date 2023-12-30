import { Res, SearchParams, TBank } from '@/interface/model';
import { url } from '@/lib/utils/url';
import { UlCard } from '@/components/Card';
import { DataEmpty } from '@/components/Errors';
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/Skeleton';
import { ListBank } from '@/app/(pages)/bank/Card';
import Paginate from '@/components/elements/Pagination';

async function getData( page: number, take: number ) {
  const res = await fetch( url + `/api/bank?page=${ page }&take=${ take }`, {
    // method: 'GET',
    cache : 'no-cache'
    // next: {
    //   tags: [ 'banks' ]
    // }
  } )
  return res.json()
}

export default async function Page( { searchParams }: SearchParams ) {
  const page = Number( searchParams.page )
  const take = Number( searchParams.take )

  const { data }: Res<any> = await getData( page, take )
  // if( !res.ok ) {
  //   throw new Error( `Error! status: ${ res.status }` );
// const { data }: Res<any> = await res.json()
  console.log( data )

  return <>
    <UlCard name={ "bank" }>
      { data.res.length === 0 ? (
        <DataEmpty/>
      ) : <>
          <Suspense fallback={ <SkeletonCard/> }>
            { data.res.map( ( d: TBank ) => ( <ListBank d={ d } key={ d.id }/> ) ) }
          </Suspense>
        </>
      }
    </UlCard>
    <Paginate
      take={ take }
      page={ page }
      length={ data.count }
    />
  </>
}
