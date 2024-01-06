import { Res, SearchParams, TProduct } from '@/interface/model';
import React, { Suspense } from 'react';
import ListProduct from '@/app/(pages)/product/Card';
import Paginate from '@/components/elements/Pagination';
import FormProduct from '@/app/(pages)/product/Form';
import { PopUp } from '@/components/PopUp';
import { UlCard } from '@/components/Card';
import Link from 'next/link';
import { url } from '@/lib/utils/url';
import { defaultFormProduct } from '@/assets/default';
import { SkeletonCard } from '@/components/Skeleton';

const getData = async ( page: number, take: number ) => {
  return fetch( url + `/api/product?page=${ page }&take=${ take }`, { cache: 'no-store', } )
}

export default async function Home( { searchParams }: SearchParams ) {
  const page = Number( searchParams.page )
  const take = Number( searchParams.take )

  const res = await getData( page, take )

  if( !res.ok ) {
    throw new Error( `Error! status: ${ res.status }` );
  }
  const { data }: Res<any> = await res.json()
  // console.log( data )

  return ( <>
      <div className={ "flex flex-row gap-5 z-50 p-2 justify-between overflow-x-auto " }>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><a>Product</a></li>
            <li><Link
              data-test={ "link-list" }
              href={ `/product/list?page=1&take=10` }
            >List
            </Link>
            </li>
          </ul>
        </div>
        <PopUp name={ `create_product` }
               title={ 'Create' }
               styles={ 'btn-primary' }>
          <FormProduct
            method={ 'POST' }
            defaultData={ defaultFormProduct }
            to={ 'product' }/>
        </PopUp>
      </div>

      <UlCard name={ "product" }>
        <Suspense fallback={ <SkeletonCard/> }>
          { data.res.map( ( d: TProduct ) => ( <ListProduct d={ d } key={ d.id } to={ 'product' }/> ) ) }
        </Suspense>
      </UlCard>
      <Paginate
        take={ take }
        page={ page }
        length={ data.count }
      />
    </>
  )
}
