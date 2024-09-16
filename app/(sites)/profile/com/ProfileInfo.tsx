import { IconDetail, IconEdit } from "@/components/icon/IconMore";
import { getUserId } from "@/server/action/user.action";
import { cookieService } from "@/server/service/auth/cookie.service";

export async function ProfileInfo() {
  const user = cookieService().getAuth().data
  const data = await getUserId({ id_user: user.id })
  if (!data || !user) {
    return <h1>User is Not found</h1>
  }
  // console.log(data)
  return (
    <div className="grid grid-cols-6 rounded-lg border-white/30 p-2 border-2 space-x-2 bg-base-200/20 shadow">
      <div className='col-span-1'>
        <img
          src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
          alt='avatar'
          className='h-auto w-full rounded-full'
        />
        <div className=" flex justify-between w-full pt-2">
          <button className='btn btn-circle btn-sm'>
            <IconDetail/>
          </button>
          <button className='btn btn-circle btn-sm'>
            <IconEdit/>
          </button>
        </div>
      </div>
      <div className='col-span-5 w-full space-y-2'>
        <h1 className='text-lg font-bold'>{ data.name }</h1>
        <section className='grid grid-cols-2'>
          
          <div className="">
            <p className={ 'text-sm' }>phone</p>
            <h1 className=''>{ data.phone }</h1>
          </div>
          
          
          <div className="">
            <p className={ 'text-sm' }>email</p>
            <h1 className=''> { data.email }</h1>
          </div>
          
          <div className="col-span-2">
            <p className={ 'text-sm' }>address</p>
            <h1 className=''>{ data.address }</h1>
          </div>
        </section>
      </div>
    </div>
  )
}
