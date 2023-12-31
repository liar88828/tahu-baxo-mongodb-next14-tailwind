import { Suspense } from 'react';
import FormDeliver from '@/app/(pages)/delivery/Form';
import { SkeletonCard } from '@/components/Skeleton';
import { defaultFormDelivery } from '@/assets/default';

// // export const dynamic    = 'force-dynamic'
// export const revalidate = 0

export default function Home() {
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormDeliver
        method={ 'POST' }
        defaultData={ defaultFormDelivery }
        to={ 'delivery' }/>
    </Suspense>
  )
}
