'use client'
import { IconAdd } from "@/components/icon/IconMore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileStatus() {
  const path = usePathname()
  const page = path.split('/')[2]

  return (
    <div className='grid grid-cols-2 gap-2'>
      <ProfileStatusItem
        title={ `All Types ${ page }` }
        count={10}
        link={ `/profile/${ page }/add` }
      />
      <ProfileStatusItem
        title={ `All ${ page } Sold` }
        count={2324}
        link={ '' }
      />
    </div>
  )
}

export function ProfileStatusItem(
  { title, count, link }: {
    title : string
    count : number,
    link: string
  }) {
  return (
    <div className=' p-2 '>
      <div className="flex justify-between w-full">
        <h1 className='text font-bold capitalize'>{title}</h1>
        <Link
          href={ link }
          className={ 'btn btn-xs btn-square  m-1' }
        ><IconAdd /></Link>
      </div>
      <h2>{count}</h2>
    </div>
  )
}
