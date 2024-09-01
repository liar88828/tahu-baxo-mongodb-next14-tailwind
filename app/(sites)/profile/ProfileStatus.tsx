import { ParamsProfile } from "@/interface/ParamsProfile";
import { IconAdd } from "@/components/icon/IconMore";
import Link from "next/link";

export function ProfileStatus({params : {searchParams : {tab}}} : { params : ParamsProfile }) {
  tab = tab === undefined ? 'product' : tab;
  return (
    <div className='grid grid-cols-2 gap-2'>
      <ProfileStatusItem
        title={`All Types ${tab}`}
        count={10}
        tab={tab}
      />
      <ProfileStatusItem
        title={`All ${tab} Sold`}
        count={2324}
        tab={tab}
      />
    </div>
  )
}

export function ProfileStatusItem(
  {title, count, tab} : {
    title : string
    count : number,
    tab : string
  }) {
  return (
    <div className='rounded-lg border-white/30 p-2 border-2 shadow bg-base-200/20'>
      <div className="flex justify-between w-full">
        <h1 className='text font-bold capitalize'>{title}</h1>
        <Link
          href={`/profile/${tab}/create`}
          className={'btn btn-xs btn-square btn-outline m-1'}
        ><IconAdd /></Link>
      </div>
      <h2>{count}</h2>
    </div>
  )
}
