import FormBank from '@/app/(pages)/bank/Form';
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/Skeleton';
import { defaultFormBank } from '@/assets/default';
import { PopUp } from '@/components/PopUp';

export default function Page() {
  return (
    <Suspense fallback={ <SkeletonCard/> }>

      <FormBank
        method={ 'POST' }
        defaultData={ defaultFormBank }
        to={ 'bank' }/>

    </Suspense>
  )
}

