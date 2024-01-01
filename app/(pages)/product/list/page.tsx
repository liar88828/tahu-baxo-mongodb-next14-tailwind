import ListProduct from '@/app/(pages)/product/Card';
import { Res, SearchParams, TProduct } from '@/interface/model';
import { UlCard } from '@/components/Card';
import Paginate from '@/components/elements/Pagination';
import { url } from '@/lib/utils/url';
import Link from 'next/link';
import { PopUp } from '@/components/PopUp';
import FormBank from '@/app/(pages)/bank/Form';
import { defaultFormBank, defaultFormProduct } from '@/assets/default';
import React from 'react';
import FormProduct from '@/app/(pages)/product/Form';

const getData = async ( page: number, take: number ) => {
  return fetch( url + `/api/product?page=${ page }&take=${ take }`, { cache: 'no-store', } )
}
// export const revalidate = 0

export default async function Home( { searchParams }: SearchParams ) {
  const page = Number( searchParams.page )
  const take = Number( searchParams.take )
  // console.log(page,take)
  // const { data }: TRes<TProduct[]> = await Fetch(
  //   {
  //     method: "GET",
  //     to    : "product",
  //     page  : page,
  //     take  : take
  //   } )
  // const length =await prisma.product.count({take:100})

  // const [ data, length ] = await Promise.all( [
  //   prisma.product.findMany( { skip: ( page - 1 ) * take, take: take } ),
  //   prisma.product.count( { take: 100 } )
  // ] )

  const res = await getData( page, take )
  
  if( !res.ok ) {
    throw new Error( `Error! status: ${ res.status }` );
  }
  const { data }: Res<any> = await res.json()
  console.log( data )

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
        <PopUp name={ 'create_product' } title={ 'Create' } styles={ 'btn-primary' }>
          <FormProduct
            method={ 'POST' }
            defaultData={ defaultFormProduct }
            to={ 'product' }/>
        </PopUp>
      </div>

      <UlCard name={ "product" }>
        { data.res.map( ( d: TProduct ) => ( <ListProduct d={ d } key={ d.id } to={ 'product' }/> ) ) }
      </UlCard>
      <Paginate
        take={ take }
        page={ page }
        length={ data.count }
      />
    </>
  )
}
