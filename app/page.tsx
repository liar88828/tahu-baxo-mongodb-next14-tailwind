import ServerComponent from '@/app/(pages)/dashboard/dashboard';
import { Suspense } from 'react';
import { SearchParams } from '@/interface/model';
import { SkeletonCard } from '@/components/Skeleton';

export default function Page( { searchParams }: SearchParams ) {
  return <Suspense fallback={ <SkeletonCard/> }>
    <ServerComponent id={ searchParams.id as string ?? 'Kirim' }/>
  </Suspense>
}


