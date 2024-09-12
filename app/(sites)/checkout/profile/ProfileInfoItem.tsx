import React from "react";
import { UserPublic } from "@/interface/user/UserPublic";
import { IconAdd, IconRemove } from "@/components/icon/IconMore";

interface ProfileInfoItemProps {
	item: UserPublic,
	add: boolean,
	fun: () => void,
}

export function ProfileInfoItem({ item, add, fun }: ProfileInfoItemProps) {
	return (
		<div
			data-testid={ 'checkout-ProfileInfoItem' }
			className='flex rounded-lg border-white/30 p-2 border-2 space-x-2 shadow flex-shrink-0 '>
			<div className="p-2">
			<img
				src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
				alt='avatar'
				className='h-auto w-32 rounded-full'
			/>
			</div>
			<div className='flex justify-between w-full '>
				<div className='space-y-0.5 pl-3'>
					<h1 className='text-lg font-bold'>{ item.name }</h1>
					<p className='text-sm text-muted-foreground font-light'>{ item.address }</p>
					<h1 className='text-sm font-medium'>{ item.email }</h1>
					<h1 className='text-sm font-medium'>{ item.phone }</h1>
				</div>
				<div className="modal-action">
					<form method="dialog">
						<button
							onClick={ fun }
							className='btn btn-circle btn-outline btn-sm'>
							{ add ? <IconAdd/> : <IconRemove/> }
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
