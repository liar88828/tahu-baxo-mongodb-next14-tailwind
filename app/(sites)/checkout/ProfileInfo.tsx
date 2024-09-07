import React from 'react';
import { getUserAll } from "@/server/action/user.action";
import { TitleCardProfile } from "@/app/(sites)/checkout/TitleCardProfile";
import { ProfileInfoItem } from "@/app/(sites)/checkout/ProfileInfoItem";

export async function ProfileInfo() {
  const data = await getUserAll()
  if (!data) {
    return <h1>User is Not found</h1>
  }
  return (
    <div>
      <TitleCardProfile
        title={'User Information'}
        text={'Select'}
      />
      <div className='flex rounded-lg border-white/30 p-2 border-2 space-x-2 shadow'>
        <img
          src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
          alt='avatar'
          className='h-auto w-20 rounded-full'
        />
        {data.map(item => (
          <ProfileInfoItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default ProfileInfo;
