'use client'
import { useReceiver } from "@/store/useReceiver";
import { ItemNotFound } from "@/app/(sites)/checkout/ItemNotFound";
import React from "react";
import { ShippingAddressCheckout } from "@/app/(sites)/checkout/profile/shippingAddressCheckout";

export function ProfileInfoContext() {
	const { receiver, removeReceiver } = useReceiver()
	
	if (!receiver) {
		return <ItemNotFound
			title={ 'Please Add User' }
			fun={ () => {
				// @ts-expect-error
				document.getElementById('modalUserInfo').showModal()
			} }
		/>
		
	}
	return (
		<div>
			<ShippingAddressCheckout
				item={ receiver }
				fun={ () => removeReceiver() }
				add={ false }
			/>
		</div>
	);
}