import React from "react";
import { UserPublic } from "@/interface/user/UserPublic";
import { IconEdit } from "@/components/icon/IconMore";

interface ProfileInfoItemProps {
	item: UserPublic
}

export function ProfileInfoItem({ item }: ProfileInfoItemProps) {
	return (
		<div className='flex justify-between w-full'>
			<div className='space-y-2'>
				<h1 className='text-lg font-bold'>{ item.name }</h1>
				<div className=''>
					<div className='flex space-x-3'>
						<h1 className='text-sm'>{ item.email }</h1>
						<h1 className='text-sm'>{ item.phone }</h1>
					</div>
					<h1 className='text-xs font-light'>
						{ item.address }
					</h1>
				</div>
			</div>
			<button className='btn btn-circle btn-outline btn-sm'>
				<IconEdit/>
			</button>
		</div>
	);
}