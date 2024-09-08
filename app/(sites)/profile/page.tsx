import { DataList } from './DataList'
import { ProfileStatus } from './ProfileStatus'
import { ProfileTab } from './ProfileTab'
import { ProfileInfo } from './ProfileInfo'
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { ParamsProfile } from "@/interface/server/param";
import { authCookie } from "@/server/api/auth";

export default async function page(params : ParamsProfile) {
  const auth = authCookie().getAuth()
  
  // const data = await apiProfile(auth.data.id)
  if (!auth) {
    return <h1>User is not found</h1>
  }
  return (
    <>
      <div className='space-y-2 p-2'>
        <ProfileInfo id={ auth.data.id }/>
        <Suspense fallback={<Loading />}>
          <ProfileTab params={params} />
          <ProfileStatus params={params} />
          <DataList params={ params }/>
        </Suspense>
      </div>
    </>
  )
}
