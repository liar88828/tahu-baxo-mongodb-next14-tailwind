import { Res, SearchParams } from '@/interface/model';
import { UlCard } from '@/components/Card';
import { DataEmpty } from '@/components/Errors';
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/Skeleton';
import { ListTravel } from '@/app/(pages)/delivery/Card';
import Paginate from '@/components/elements/Pagination';
import { url } from '@/lib/utils/url';
const getData = async ( page: number, take: number ) => {
  return fetch( url + `/api/delivery?page=${ page }&take=${ take }`, {
    // method: 'GET',
    cache : 'no-store'
  } )
}


export default async function Home( { searchParams }: SearchParams ) {
  const page = Number( searchParams.page )
  const take = Number( searchParams.take )
  // console.log(page,take)
  // const { data }: TRes<TDelivery[]> = await Fetch(
  //   {
  //     method: "GET",
  //     to    : "delivery",
  //     // id    : 'all',
  //     page: page,
  //     take: take
  //   } )

  // const [ data, length ] = await Promise.all( [
  //   prisma.delivery.findMany( { skip: ( page - 1 ) * take, take: take } ),
  //   prisma.delivery.count( { take: 100 } )
  // ] )

  // console.log(data)

  const res = await getData(
    page,
    take
  )
  if( !res.ok ) {
    throw new Error( `Error! status: ${ res.status }` );
  }
  const { data }: Res<any> = await res.json()
  console.log( data )

  return ( <>
      <UlCard name={ "delivery" }>
        { data.res.length === 0 ? (
          <DataEmpty/>
        ) : <>
            <Suspense fallback={ <SkeletonCard/> }>
              { data.res.map( ( d:any ) => ( <ListTravel d={ d } key={ d.id } to={ 'delivery' }/> ) ) }
            </Suspense>
          </> }
      </UlCard>
      <Paginate
        take={ take }
        page={ page }
        length={ data.count }
      />
    </>
  )
}
