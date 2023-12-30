import FormBank from '@/app/(pages)/bank/Form';
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/Skeleton';
import { defaultFormBank } from '@/assets/default';

export default function Page() {
  return (
    <Suspense fallback={ <SkeletonCard/> }>
      <FormBank
        method={ 'POST' }
        defaultData={ defaultFormBank }
        id={ "" }
        to={ 'bank' }/>
    </Suspense>
  )
}

