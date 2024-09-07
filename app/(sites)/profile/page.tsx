import { DataList } from './DataList'
import { ProfileStatus } from './ProfileStatus'
import { ProfileTab } from './ProfileTab'
import { ProfileInfo } from './ProfileInfo'
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { getUserIdPrisma } from "@/server/action/test";
import { ParamsProfile } from "@/interface/server/param";

export default async function page(params : ParamsProfile) {
  const data = await getUserIdPrisma()
  if (!data) {
    return <h1>User is not found</h1>
  }
  return (
    <>
      <div className='space-y-2 p-2'>
        <ProfileInfo id={data.id} />
        <Suspense fallback={<Loading />}>
          <ProfileTab params={params} />
          <ProfileStatus params={params} />
          <DataList />
        </Suspense>
      </div>
    </>
  )
}
