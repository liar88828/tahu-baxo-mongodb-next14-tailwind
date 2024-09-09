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
      <TitleCardProfile data={ data }/>
      <div className="gap-2 overflow-x-scroll flex  ">
        { data.map(item => <ProfileInfoItem item={ item } key={ item.id }/>) }
      </div>
    </div>
  )
}

export default ProfileInfo;
