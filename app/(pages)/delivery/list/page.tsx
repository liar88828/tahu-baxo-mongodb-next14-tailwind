import { Res, SearchParams } from '@/interface/model';
import { UlCard } from '@/components/Card';
import { DataEmpty } from '@/components/Errors';
import React, { Suspense } from 'react';
import { SkeletonCard } from '@/components/Skeleton';
import { ListTravel } from '@/app/(pages)/delivery/Card';
import Paginate from '@/components/elements/Pagination';
import { url } from '@/lib/utils/url';
import Link from 'next/link';
import { PopUp } from '@/components/PopUp';
import FormDeliver from '@/app/(pages)/delivery/Form';
import { defaultFormDelivery } from '@/assets/default';
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

      <div className={ "flex flex-row gap-5 z-50 p-2 justify-between overflow-x-auto " }>

        <div className="text-sm breadcrumbs">
          <ul>
            <li><a>Delivery</a></li>
            <li><Link
              data-test={ "link-list" }
              href={ `/delivery/list?page=1&take=10` }
            >List
            </Link>
            </li>
          </ul>
        </div>
        <PopUp name={ 'create_delivery' } title={ 'Create' } styles={ 'btn-primary' }>
          <FormDeliver
            method={ 'POST' }
            defaultData={ defaultFormDelivery }
            to={ 'delivery' }
          />
        </PopUp>
      </div>


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
