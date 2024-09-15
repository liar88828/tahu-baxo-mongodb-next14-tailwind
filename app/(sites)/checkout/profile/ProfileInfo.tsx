import React from 'react';
import { ProfileInfoContext, ProfileModal } from "@/app/(sites)/checkout/profile/ProfileModal";
import { getDataReceiver } from "@/server/action/receiver.action";

export async function ProfileInfo() {
	const data = await getDataReceiver('')
  if (!data) {
    return <h1>User is Not found</h1>
  }
  return (
    <div>
			<div
				data-testid={ 'checkout-ProfileInfo' }
				className="flex justify-between items-center w-full text-2xl mb-2 ">
				<h1 className={ 'font-bold text-xl' }>User Information</h1>
				<ProfileModal data={ data.data }/>
      </div>
			<ProfileInfoContext/>
    </div>
  )
}

export default ProfileInfo;
