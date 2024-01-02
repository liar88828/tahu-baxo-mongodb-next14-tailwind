import { Res, TBank } from '@/interface/model';
import { url } from '@/lib/utils/url';
import { UlCard } from '@/components/Card';
import { DataEmpty } from '@/components/Errors';
import React, { Suspense } from 'react';
import { SkeletonCard } from '@/components/Skeleton';
import { ListBank } from '@/app/(pages)/bank/Card';
import Paginate from '@/components/elements/Pagination';
import { PopUp } from '@/components/PopUp';
import FormBank from '@/app/(pages)/bank/Form';
import { defaultFormBank } from '@/assets/default';
import Link from 'next/link';

async function getData( page: number, take: number ) {
  const res = await fetch( url + `/api/bank?page=${ page }&take=${ take }`, {
    // method: 'GET',
    cache : 'no-cache'
    // next: {
    //   tags: [ 'bank' ]
    // }
  } )
  return res.json()
}

export default async function Page( { searchParams }: any ) {
  const page = Number( searchParams.page )
  const take = Number( searchParams.take )

  const { data }: Res<any> = await getData( page, take )

  return <>
    <div className={ "flex flex-row gap-5 z-50 p-2 justify-between overflow-x-auto " }>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><a>Bank</a></li>
          <li><Link
            data-test={ "link-list" }
            href={ `/bank/list?page=1&take=10` }
          >List</Link>
          </li>
        </ul>
      </div>

      <PopUp name={ 'create_bank' }
             title={ 'Create' }
             styles={ 'btn-info' }>
        <FormBank
          method={ 'POST' }
          defaultData={ defaultFormBank }
          to={ 'bank' }/>
      </PopUp>
    </div>


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
