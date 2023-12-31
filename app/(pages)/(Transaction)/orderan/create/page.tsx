import React, { Suspense } from 'react';
import FormOrderan from '@/app/(pages)/(Transaction)/orderan/FormOrderan';
import { SkeletonCard } from '@/components/Skeleton';
import { defaultFormOrderan } from '@/assets/default';
import Link from 'next/link';

export type OrderanData = {
  travel: { nama: string }[],
  bank: { nama: string }[],
  product: { id: string, nama: string, img: string, jumlah: number, jenis: string, harga: number, lokasi: string }[]
}

async function getData() {
  const res = await fetch( 'http://localhost:3000/api/orderan?option=orderan', { cache: 'no-cache' } )
  return res.json()
}

export default async function Page() {
  const { data }: { data: OrderanData } = await getData()
  return ( <>
      <div className="text-sm breadcrumbs">
      <ul>
          <li><a>Transaction</a></li>
          <li><Link
            data-test={ "link-list" }
            href={ `/orderan/create` }
          >Create
          </Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={ <SkeletonCard/> }>

        <FormOrderan id={ "" } method={ "POST" }
                     defaultDataOrder={ defaultFormOrderan }
                     travel={ data.travel }
                     product={ data.product }
                     bank={ data.bank }/>

      </Suspense>
    </>
  )
}

