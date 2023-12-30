import { Suspense } from 'react';
import FormProduct from '@/app/(pages)/product/Form';
import { SkeletonCard } from '@/components/Skeleton';
import { defaultFormProduct } from '@/assets/default';

export default function Page() {
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormProduct
        method={ 'POST' }
        defaultData={ defaultFormProduct }
        id={ "" }
        to={ 'product' }/>
    </Suspense>
  )
}

