import React from "react";
import { UserPublic } from "@/interface/user/UserPublic";
import { IconEdit } from "@/components/icon/IconMore";

interface ProfileInfoItemProps {
	item: UserPublic
}

export function ProfileInfoItem({ item }: ProfileInfoItemProps) {
	return (
		<div className='flex rounded-lg border-white/30 p-2 border-2 space-x-2 shadow   flex-shrink-0'>
			<img
				src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
				alt='avatar'
				className='h-auto w-20 rounded-full'
			/>
			<div className='flex justify-between w-full '>
				<div className='space-y-2 pl-3'>
					<h1 className='text-lg font-bold'>{ item.name }</h1>
					<div className=''>
						<div className='flex  flex-col'>
							<h1 className='text-sm'>{ item.email }</h1>
							<h1 className='text-sm'>{ item.phone }</h1>
						</div>
					</div>
					<h1 className='text-xs font-light'>{ item.address }</h1>
				</div>
				<button className='btn btn-circle btn-outline btn-sm'>
					<IconEdit/>
				</button>
			</div>
		</div>
	);
}