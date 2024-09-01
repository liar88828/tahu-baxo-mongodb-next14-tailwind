import { DataList } from './DataList'
import { ProfileStatus } from './ProfileStatus'
import { ProfileTab } from './ProfileTab'
import { ProfileInfo } from './ProfileInfo'
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { ParamsProfile } from "@/interface/ParamsProfile";

export default function page(params : ParamsProfile) {
  return (
    <>
      <div className='space-y-2 p-2'>
        <ProfileInfo />
        <Suspense fallback={<Loading />}>
          <ProfileTab params={params} />
          <ProfileStatus params={params} />
          <DataList />
        </Suspense>
      </div>
    </>
  )
}
